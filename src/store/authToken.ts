let accessToken: string | null = null;

const authTokenStore = {
  set(token: string) {
    accessToken = token;
  },
  get() {
    return accessToken;
  },
  clear() {
    accessToken = null;
  },
};

export default authTokenStore;
