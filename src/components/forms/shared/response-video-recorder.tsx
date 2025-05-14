"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Mic, Square, RefreshCcw, Upload } from "lucide-react";

type VideoRecorderProps = {
  maxDuration: number;
};

type RecorderState = "idle" | "countdown" | "recording" | "preview";

export function VideoRecorder({ maxDuration }: VideoRecorderProps) {
  const [state, setState] = useState<RecorderState>("idle");
  const [countdown, setCountdown] = useState(3);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const previewRef = useRef<HTMLVideoElement>(null);

  // Request camera access
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
      }

      return true;
    } catch (err) {
      console.error("Error accessing camera:", err);
      return false;
    }
  };

  // Start countdown before recording
  const handleStartRecording = async () => {
    const cameraReady = await startCamera();
    if (!cameraReady) return;

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
    if (!streamRef.current) return;

    setState("recording");
    setRecordingTime(0);
    chunksRef.current = [];

    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      setRecordedBlob(blob);
      setRecordedUrl(url);

      if (previewRef.current) {
        previewRef.current.src = url;
      }

      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };

    // Start recording
    mediaRecorder.start(100);

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

  // Stop recording
  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setState("preview");
    }
  };

  // Restart the recording process
  const handleRestart = () => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }

    setRecordedBlob(null);
    setRecordedUrl(null);
    setRecordingTime(0);
    setState("idle");
  };

  // Handle submission
  const handleSubmit = () => {
    if (!recordedBlob) return;
    console.log("Submitting video:", recordedBlob);
    handleRestart();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl);
      }
    };
  }, [recordedUrl]);

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

        {state === "preview" && (
          <video
            ref={previewRef}
            controls
            playsInline
            className="w-full h-full object-cover"
            autoPlay
          />
        )}
      </div>

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
          <Button
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
