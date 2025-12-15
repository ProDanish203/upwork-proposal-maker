import api from "./middleware";

export const createChat = async () => {
  try {
    const { data } = await api.post("/chat", {}, { withCredentials: true });
    if (data.success) return { response: data.chat, success: true };
    return { response: data.message, success: false };
  } catch (error) {
    return { response: "Something went wrong", success: false };
  }
};

export const updateChat = async ({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) => {
  try {
    const { data } = await api.put(
      `/chat/${chatId}`,
      { title },
      { withCredentials: true }
    );
    if (data.success) return { response: data.chat, success: true };
    return { response: data.message, success: false };
  } catch (error) {
    return { response: "Something went wrong", success: false };
  }
};

export const deleteChat = async (chatId: string) => {
  try {
    const { data } = await api.delete(`/chat/${chatId}`, {
      withCredentials: true,
    });
    if (data.success) return { response: data.message, success: true };
    return { response: data.message, success: false };
  } catch (error) {
    return { response: "Something went wrong", success: false };
  }
};

export const getAllChats = async (page: number = 1, limit: number = 20) => {
  try {
    const { data } = await api.get(`/chat?limit=${limit}&page=${page}`, {
      withCredentials: true,
    });
    if (data.success) return { response: data.chats, success: true };
    return { response: data.message, success: false };
  } catch (error) {
    return { response: "Something went wrong", success: false };
  }
};

export const getChatById = async (chatId: string) => {
  try {
    const { data } = await api.get(`/chat/${chatId}`, {
      withCredentials: true,
    });
    if (data.success) return { response: data.chat, success: true };
    return { response: data.message, success: false };
  } catch (error) {
    return { response: "Something went wrong", success: false };
  }
};
