import api from "./middleware";
import { UpdateProfileRequest } from "@/types";

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/user/me", { withCredentials: true });
    if (data.success) return { response: data.user, success: true };
    return { response: data.message, success: false };
  } catch (err) {
    return { response: "Something went wrong", success: false };
  }
};

export const updateProfile = async (payload: UpdateProfileRequest) => {
  try {
    const { data } = await api.put("/user/profile", payload, {
      withCredentials: true,
    });
    if (data.success) return { response: data.user, success: true };
    return { response: data.message, success: false };
  } catch (err) {
    return { response: "Something went wrong", success: false };
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await api.get("/user/profile", { withCredentials: true });
    if (data.success) return { response: data.user, success: true };
    return { response: data.message, success: false };
  } catch (err) {
    return { response: "Something went wrong", success: false };
  }
};
