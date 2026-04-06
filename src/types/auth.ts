export type LoginState = {
  success: boolean;
  message: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const initialLoginState = {
  success: false,
  message: "",
};