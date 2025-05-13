import { create } from "zustand";
import type { StateCreator } from "zustand";

interface TestimonialState {
  rating: number;
  text: string;

  // Actions
  setRating: (rating: number) => void;
  setText: (text: string) => void;
  reset: () => void;
}

export const useTestimonialStore = create<TestimonialState>(((set) => ({
  rating: 0,
  text: "",

  setRating: (rating: number) => set({ rating }),
  setText: (text: string) => set({ text }),
  reset: () => set({ rating: 0, text: "" }),
})) as StateCreator<TestimonialState>);
