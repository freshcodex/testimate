"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Mic, Square, RefreshCcw, Upload } from "lucide-react";
import { useReactMediaRecorder } from "react-media-recorder";
import MuxUploader, { MuxUploaderProgress } from "@mux/mux-uploader-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useTestimonialStore } from "@/store/testimonial-store";

type VideoRecorderProps = {
  maxDuration: number;
  onUploadComplete?: (playbackId: string) => void;
};

type RecorderState =
  | "idle"
  | "countdown"
  | "recording"
  | "preview"
  | "uploading"
  | "file-preview"
  | "completed";

interface HTMLVideoElementWithSrcObject extends HTMLVideoElement {
  srcObject: MediaStream | null;
}

// TODO: before starting the recording, ask for permission than start, currently timer starts before permission is given
// TODO: don't keep the camera on when not recording or stopped recording currently is turned on entire time until i close the tab
export function VideoRecorder({
  maxDuration,
  onUploadComplete,
}: VideoRecorderProps) {
  const [state, setState] = useState<RecorderState>("idle");
  const [countdown, setCountdown] = useState(3);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filePreviewRef = useRef<HTMLVideoElement>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const { projectSlug } = useParams<{ projectSlug: string }>();

  const { mutate: getMuxUploadUrl } =
    api.fileUpload.getMuxUploadUrl.useMutation({
      onSuccess: (data) => {
        setUploadUrl(data.uploadUrl);
      },
      onError: (error) => {
        toast.error("Failed to get upload URL");
        console.error("Upload URL error:", error);
      },
    });

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    clearBlobUrl,
  } = useReactMediaRecorder({
    video: true,
    audio: true,
    onStop: () => {
      setState("preview");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Stop all tracks in the preview stream
      if (previewStream) {
        previewStream.getTracks().forEach((track) => track.stop());
      }
    },
  });

  const videoRef = useRef<HTMLVideoElementWithSrcObject>(null);
  const previewRef = useRef<HTMLVideoElement>(null);

  // TODO: fix this currently flickering even in use-effect
  if (videoRef.current && previewStream) {
    videoRef.current.srcObject = previewStream;
  }

  // Start countdown before recording
  const handleStartRecording = () => {
    setState("countdown");
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          beginRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Begin actual recording after countdown
  const beginRecording = () => {
    setState("recording");
    setRecordingTime(0);
    startRecording();

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= maxDuration) {
          stopRecording();
          return maxDuration;
        }
        return prev + 1;
      });
    }, 1000);
  };

  // Restart the recording process
  const handleRestart = () => {
    clearBlobUrl();
    setRecordingTime(0);
    // Stop all tracks in the preview stream
    if (previewStream) {
      previewStream.getTracks().forEach((track) => track.stop());
    }
    setState("idle");
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a video file");
      return;
    }

    setSelectedFile(file);
    setState("file-preview");
  };

  // Handle file preview cancel
  const handleFilePreviewCancel = () => {
    setSelectedFile(null);
    setState("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle upload button click
  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // necessary to prevent the parent from being clicked
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  // Handle upload complete
  const handleUploadComplete = (event: CustomEvent) => {
    const { playbackId } = event.detail;
    setState("completed");
    onUploadComplete?.(playbackId);
    toast.success("Video uploaded successfully");
  };

  const { setTestimonialId, setToken } = useTestimonialStore();

  const handleSelectedFileUpload = async () => {
    setState("uploading");

    getMuxUploadUrl(
      {
        fileName: selectedFile?.name || "recording.webm",
        fileType: selectedFile?.type || "video/webm",
        projectSlug: projectSlug,
      },
      {
        onSuccess: async (data) => {
          if (!selectedFile) {
            toast.error("No file selected");
            return;
          }
          try {
            const response = await fetch(data.uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": selectedFile.type,
                "Content-Length": selectedFile.size.toString(),
              },
              body: selectedFile,
            });

            console.log(JSON.stringify(response.body, null, 2));

            if (!response.ok) {
              throw new Error(`Upload failed with status: ${response.status}`);
            }
            setTestimonialId(data.testimonialId!);
            setToken(data.token!);
            onUploadComplete?.(data.uploadId);
            toast.success("Video uploaded successfully");
            setState("completed");
          } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload video. Please try again.");
            setState("file-preview");
          }
        },
        onError: (error) => {
          console.error("Upload URL error:", error);
          toast.error("Failed to get upload URL");
          setState("file-preview");
        },
      }
    );
  };

  // Handle submission
  const handleSubmit = async () => {
    if (!mediaBlobUrl) return;

    try {
      setState("uploading");
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      const file = new File([blob], "recording.webm", { type: "video/webm" });

      getMuxUploadUrl(
        {
          fileName: file.name,
          fileType: file.type,
          projectSlug: projectSlug,
        },
        {
          onSuccess: async (data) => {
            if (!file) {
              toast.error("No file selected");
              return;
            }
            try {
              const response = await fetch(data.uploadUrl, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type,
                  "Content-Length": file.size.toString(),
                },
                body: file,
              });

              if (!response.ok) {
                throw new Error(
                  `Upload failed with status: ${response.status}`
                );
              }
              setTestimonialId(data.testimonialId!);
              setToken(data.token!);
              onUploadComplete?.(data.uploadId);
              toast.success("Video uploaded successfully");
              setState("completed");
            } catch (error) {
              console.error("Upload error:", error);
              toast.error("Failed to upload video. Please try again.");
              setState("file-preview");
            }
          },
          onError: (error) => {
            console.error("Upload URL error:", error);
            toast.error("Failed to get upload URL");
            setState("file-preview");
          },
        }
      );
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to prepare video for upload");
      setState("preview");
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <Card className="w-full max-w-md overflow-hidden bg-white rounded-3xl shadow-lg">
      {uploadUrl && (
        <MuxUploader
          id="video-uploader"
          endpoint={uploadUrl}
          onSuccess={handleUploadComplete}
          className="hidden"
        />
      )}

      {/* Video Area */}
      <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-100 mb-6">
        {state === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Button
              onClick={handleStartRecording}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-3"
            >
              <Camera className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
          </div>
        )}

        {state === "countdown" && (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="text-8xl font-bold text-white">{countdown}</div>
            </div>
          </>
        )}

        {state === "recording" && (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4">
                    <span className="sr-only">Audio level</span>
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <rect x="1" y="10" width="2" height="4" fill="white" />
                      <rect x="5" y="8" width="2" height="8" fill="white" />
                      <rect x="9" y="6" width="2" height="12" fill="white" />
                      <rect x="13" y="4" width="2" height="16" fill="white" />
                      <rect x="17" y="2" width="2" height="20" fill="white" />
                      <rect x="21" y="0" width="2" height="24" fill="white" />
                    </svg>
                  </div>
                  <span>
                    {formatTime(recordingTime)} / {formatTime(maxDuration)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={stopRecording}
                    size="icon"
                    className="rounded-full bg-white hover:bg-gray-100 h-14 w-14"
                  >
                    {recordingTime % 2 === 0 ? (
                      <Square className="w-5 h-5 text-red-500" />
                    ) : (
                      <div className="w-5 h-5 rounded bg-red-500" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white rounded-full"
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {state === "preview" && mediaBlobUrl && (
          <video
            ref={previewRef}
            src={mediaBlobUrl}
            controls
            playsInline
            className="w-full h-full object-cover"
            autoPlay
          />
        )}

        {state === "uploading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
            <div className="text-white text-lg mb-2">Uploading...</div>
            <MuxUploaderProgress
              muxUploader="video-uploader"
              type="bar"
              className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden"
            />
            <MuxUploaderProgress
              muxUploader="video-uploader"
              type="percentage"
              className="text-white text-sm mt-2"
            />
          </div>
        )}

        {state === "file-preview" && selectedFile && (
          <>
            <video
              ref={filePreviewRef}
              src={URL.createObjectURL(selectedFile)}
              controls
              playsInline
              className="w-full h-full object-cover"
              autoPlay
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm truncate max-w-[200px]">
                  {selectedFile.name}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSelectedFileUpload}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-3"
                  >
                    Upload
                  </Button>
                  <Button
                    onClick={handleFilePreviewCancel}
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {state === "completed" && (
        <div className="text-center text-lg">
          Video uploaded successfully
          <p className="text-sm text-gray-500">
            Please continue to the next step
          </p>
        </div>
      )}

      {/* Actions */}
      {state === "preview" && (
        <div className="space-y-4">
          <Button
            onClick={handleRestart}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
          >
            <RefreshCcw className="w-5 h-5" />
            Restart
          </Button>

          <Button
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Submit
          </Button>
        </div>
      )}

      {state === "idle" && (
        <div className="border-t pt-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="video/*"
            className="hidden"
          />
          <Button
            onClick={handleUploadClick}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
          >
            <Upload className="w-5 h-5" />
            Upload a file
          </Button>
        </div>
      )}
    </Card>
  );
}
