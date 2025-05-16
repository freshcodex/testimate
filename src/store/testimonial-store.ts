import { create } from "zustand";
import type { StateCreator } from "zustand";

interface TestimonialState {
  rating: number;
  text: string;
  videoUrl: string;

  testimonialId?: number;
  token?: string;

  // Actions
  setRating: (rating: number) => void;
  setText: (text: string) => void;
  setVideoUrl: (videoUrl: string) => void;
  setTestimonialId: (testimonialId: number) => void;
  setToken: (token: string) => void;
  reset: () => void;
}

export const useTestimonialStore = create<TestimonialState>(((set) => ({
  rating: 0,
  text: "",
  videoUrl: "",
  testimonialId: undefined,
  token: undefined,
  setRating: (rating: number) => set({ rating }),
  setText: (text: string) => set({ text }),
  setVideoUrl: (videoUrl: string) => set({ videoUrl }),
  setTestimonialId: (testimonialId: number) => set({ testimonialId }),
  setToken: (token: string) => set({ token }),
  reset: () =>
    set({
      rating: 0,
      text: "",
      videoUrl: "",
      testimonialId: undefined,
      token: undefined,
    }),
})) as StateCreator<TestimonialState>);
