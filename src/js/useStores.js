import { create } from 'zustand'

export const dashboardStore = create((set) => ({
    projectID: null,
    setProjectID: (newProjectID) => set({ projectID: newProjectID })
}));