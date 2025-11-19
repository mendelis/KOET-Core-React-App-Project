let accessTokenGetter: () => string | null = () => null;
let accessTokenSetter: (t: string | null) => void = () => {};
let signOutHandler: () => Promise<void> = async () => {};

export const getAccessToken = () => accessTokenGetter();
export const setAccessToken = (t: string | null) => accessTokenSetter(t);
export const signOut = async () => await signOutHandler();

export const bindAuthRef = (impl: {
  getAccessToken: () => string | null;
  setAccessToken: (t: string | null) => void;
  signOut: () => Promise<void>;
}) => {
  accessTokenGetter = impl.getAccessToken;
  accessTokenSetter = impl.setAccessToken;
  signOutHandler = impl.signOut;
};