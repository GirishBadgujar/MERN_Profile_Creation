import create from 'zustand';

export const useAuthStore = create((set) => ({
  auth: {
    username: '',
    active: false,
  },
  setUsername: (name) =>
    set({
      auth: {
        ...set().auth, // Get the current auth state
        username: name,
      },
    }),
}));
