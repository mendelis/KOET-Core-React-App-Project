// src/auth/authRef.ts

export let getAccessToken: () => string | null = () => null;
export let setAccessToken: (t: string | null) => void = () => {};
export let signOut: () => Promise<void> = async () => {};

// Called by AuthProvider to wire the real implementations
export const bindAuthRef = (impl: {
  getAccessToken: () => string | null;
  setAccessToken: (t: string | null) => void;
  signOut: () => Promise<void>;
}) => {
  getAccessToken = impl.getAccessToken;
  setAccessToken = impl.setAccessToken;
  signOut = impl.signOut;
};