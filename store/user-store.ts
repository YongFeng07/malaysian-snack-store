import { create } from 'zustand'

interface UserState {
  id?: string
  email?: string
  role: 'customer' | 'admin' | 'staff'
  setUser: (user: Partial<UserState>) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  role: 'customer',
  setUser: (user) => set(user),
  clearUser: () => set({ id: undefined, email: undefined, role: 'customer' }),
}))
