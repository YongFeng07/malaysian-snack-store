import { create } from 'zustand'

interface UiStore {
  commandOpen: boolean
  setCommandOpen: (open: boolean) => void
}

export const useUiStore = create<UiStore>((set) => ({
  commandOpen: false,
  setCommandOpen: (commandOpen) => set({ commandOpen }),
}))
