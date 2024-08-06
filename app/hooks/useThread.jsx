import { create } from 'zustand';

export const useThread = create((set) => ({
    imageHover: false,
    setImageHover: (newState) => set({ imageHover: newState }),

    getThreadSettings: () => {
        let threadSettings = localStorage.getItem("threadSettings") || '{}';

        if (JSON.parse(threadSettings) === {}) {
            return {
                imageHover: false
            }
        }

        return JSON.parse(threadSettings);
    }
}));