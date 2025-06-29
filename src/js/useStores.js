import { create } from 'zustand'

export const dashboardStore = create((set) => ({
    user: null,
    storeChatUsers: [],
    setUsername: (id, newUsername) => set({ 
        userID: id,
        username: newUsername }),
    storeSetChatUsers: (user) => set({ storeChatUsers: user })
}));