import { Chat } from "@/components/chat/chat";

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <Chat
        chatId={id}
        initialMessages={[
          {
            id: "1",
            role: "assistant",
            parts: [
              { type: "text", text: "Hello! How can I assist you today?" },
            ],
          },
          {
            id: "2",
            role: "user",
            parts: [{ type: "text", text: "I need help with my project." }],
          },
        ]}
      />
    </div>
  );
};

export default ChatPage;
