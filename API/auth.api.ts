import { LoginSchema, SignupSchema } from "@/schema/auth.schema";
import api from "./middleware";

export const signup = async (payload: SignupSchema) => {
  try {
    const { data } = await api.post("/auth/signup", payload, {
      withCredentials: true,
    });
    if (data.success)
      return {
        response: { user: data.user, token: data.token },
        success: true,
      };
    return { response: data.message, success: false };
  } catch (err) {
    return { response: "Something went wrong", success: false };
  }
};

export const login = async (payload: LoginSchema) => {
  try {
    const { data } = await api.post("/auth/login", payload, {
      withCredentials: true,
    });
    if (data.success)
      return {
        response: { user: data.user, token: data.token },
        success: true,
      };
    return { response: data.message, success: false };
  } catch (err) {
    return { response: "Something went wrong", success: false };
  }
};

export const logout = async () => {
  try {
    const { data } = await api.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    return { message: "Something went wrong", success: false };
  }
};
