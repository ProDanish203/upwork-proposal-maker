"use client";
import { motion } from "motion/react";
import { ChatMessage } from "@/types";
import type { UseChatHelpers } from "@ai-sdk/react";
import { ArrowDownIcon, SparklesIcon } from "lucide-react";
import { Greeting, PreviewMessage, ThinkingMessage } from "./message";
import { useMessages } from "@/hooks/use-message";

type MessageProps = {
  chatId: string;
  messages: ChatMessage[];
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
  regenerate: UseChatHelpers<ChatMessage>["regenerate"];
  status: UseChatHelpers<ChatMessage>["status"];
};

export const Messages: React.FC<MessageProps> = ({
  chatId,
  messages,
  setMessages,
  regenerate,
  status,
}) => {
  const {
    containerRef: messagesContainerRef,
    endRef: messagesEndRef,
    isAtBottom,
    scrollToBottom,
    hasSentMessage,
  } = useMessages({
    status,
  });

  //   useDataStream();

  return (
    <div className="relative flex-1">
      <div
        className="absolute inset-0 touch-pan-y overflow-y-auto"
        ref={messagesContainerRef}
      >
        <div className="mx-auto flex min-w-0 max-w-4xl flex-col gap-4 px-2 py-4 md:gap-6 md:px-4">
          {messages.length === 0 && <Greeting />}

          {messages.map((message, index) => (
            <PreviewMessage
              chatId={chatId}
              isLoading={
                status === "streaming" && messages.length - 1 === index
              }
              key={message.id}
              message={message}
              regenerate={regenerate}
              setMessages={setMessages}
            />
          ))}

          {status === "submitted" && <ThinkingMessage />}

          <div className="min-h-6 min-w-6 shrink-0" ref={messagesEndRef} />
        </div>
      </div>

      <button
        aria-label="Scroll to bottom"
        className={`-translate-x-1/2 absolute bottom-4 left-1/2 z-10 rounded-full border bg-background p-2 shadow-lg transition-all hover:bg-muted ${
          isAtBottom
            ? "pointer-events-none scale-0 opacity-0"
            : "pointer-events-auto scale-100 opacity-100"
        }`}
        onClick={() => scrollToBottom("smooth")}
        type="button"
      >
        <ArrowDownIcon className="size-4" />
      </button>
    </div>
  );
};
