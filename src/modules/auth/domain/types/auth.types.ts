export type AuthUser = {
  username: string;
  permissions: number;
  id_user: number;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthTokenPayload = AuthUser & {
  exp: number;
};

export type MongoUser = {
  _id: {
    toString(): string;
  };
  username: string;
  password: string;
  permissions: number;
  id_user: number;
};
