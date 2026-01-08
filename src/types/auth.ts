export type User = {
  name: string;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
};
