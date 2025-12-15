"use client";
import { Attachment, ChatMessage } from "@/types";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Messages } from "./messages";

interface ChatProps {
  initialMessages: ChatMessage[];
  chatId: string;
}
export const Chat: React.FC<ChatProps> = ({ initialMessages, chatId }) => {
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    regenerate,
    resumeStream,
  } = useChat<ChatMessage>({
    id: chatId,
    messages: initialMessages,
  });

  return (
    <>
      <div className="overscroll-behavior-contain flex h-dvh min-w-0 touch-pan-y flex-col bg-background">
        <Messages
          chatId={chatId}
          messages={messages}
          regenerate={regenerate}
          setMessages={setMessages}
          status={status}
        />

        <div className="sticky bottom-0 z-1 mx-auto flex w-full max-w-4xl gap-2 border-t-0 bg-background px-2 pb-3 md:px-4 md:pb-4">
          {/* <MultimodalInput
            attachments={attachments}
            chatId={chatId}
            input={input}
            messages={messages}
            sendMessage={sendMessage}
            setAttachments={setAttachments}
            setInput={setInput}
            setMessages={setMessages}
            status={status}
            stop={stop}
          /> */}
        </div>
      </div>
    </>
  );
};
