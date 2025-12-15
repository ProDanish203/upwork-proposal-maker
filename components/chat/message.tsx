"use client";
import { motion } from "motion/react";
import { SparklesIcon } from "lucide-react";
import React from "react";
import { ChatMessage } from "@/types";
import { UseChatHelpers } from "@ai-sdk/react";
import { cn, sanitizeText } from "@/lib/utils";
import { MessageContent } from "../chat-elements/message";
import { Response } from "../chat-elements/response";
import { Attachments } from "../chat-elements/attachments";

type MessageProps = {
  chatId: string;
  message: ChatMessage;
  isLoading: boolean;
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
  regenerate: UseChatHelpers<ChatMessage>["regenerate"];
};

export const PreviewMessage: React.FC<MessageProps> = ({
  chatId,
  message,
  isLoading,
  setMessages,
  regenerate,
}) => {
  const attachmentsFromMessage = message.parts.filter(
    (part) => part.type === "file"
  );

  return (
    <div
      className="group/message fade-in w-full animate-in duration-200"
      data-role={message.role}
      data-testid={`message-${message.role}`}
    >
      <div
        className={cn("flex w-full items-start gap-2 md:gap-3", {
          "justify-end": message.role === "user",
          "justify-start": message.role === "assistant",
        })}
      >
        {message.role === "assistant" && (
          <div className="-mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
            <SparklesIcon size={14} />
          </div>
        )}

        <div
          className={cn("flex flex-col", {
            "gap-2 md:gap-4": message.parts?.some(
              (p) => p.type === "text" && p.text?.trim()
            ),
            "w-full":
              message.role === "assistant" &&
              message.parts?.some((p) => p.type === "text" && p.text?.trim()),
            "max-w-[calc(100%-2.5rem)] sm:max-w-[min(fit-content,80%)]":
              message.role === "user",
          })}
        >
          {attachmentsFromMessage.length > 0 && (
            <div
              className="flex flex-row justify-end gap-2"
              data-testid={"message-attachments"}
            >
              {attachmentsFromMessage.map((attachment) => (
                <Attachments
                  attachment={{
                    name: attachment.filename ?? "file",
                    contentType: attachment.mediaType,
                    url: attachment.url,
                  }}
                  key={attachment.url}
                />
              ))}
            </div>
          )}

          {message.parts?.map((part, index) => {
            const { type } = part;
            const key = `message-${message.id}-part-${index}`;

            // if (type === "reasoning" && part.text?.trim().length > 0) {
            //   return (
            //     <MessageReasoning
            //       isLoading={isLoading}
            //       key={key}
            //       reasoning={part.text}
            //     />
            //   );
            // }

            if (type === "text") {
              return (
                <div key={key}>
                  <MessageContent
                    className={cn({
                      "w-fit wrap-break-words rounded-2xl px-3 py-2 text-right text-white":
                        message.role === "user",
                      "bg-transparent px-0 py-0 text-left":
                        message.role === "assistant",
                    })}
                    data-testid="message-content"
                    style={
                      message.role === "user"
                        ? { backgroundColor: "#006cff" }
                        : undefined
                    }
                  >
                    <Response>{sanitizeText(part.text)}</Response>
                  </MessageContent>
                </div>
              );
            }

            // if (type === "tool-getWeather") {
            //   const { toolCallId, state } = part;

            //   return (
            //     <Tool defaultOpen={true} key={toolCallId}>
            //       <ToolHeader state={state} type="tool-getWeather" />
            //       <ToolContent>
            //         {state === "input-available" && (
            //           <ToolInput input={part.input} />
            //         )}
            //         {state === "output-available" && (
            //           <ToolOutput
            //             errorText={undefined}
            //             output={<Weather weatherAtLocation={part.output} />}
            //           />
            //         )}
            //       </ToolContent>
            //     </Tool>
            //   );
            // }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export const ThinkingMessage = () => {
  return (
    <div
      className="group/message fade-in w-full animate-in duration-300"
      data-role="assistant"
      data-testid="message-assistant-loading"
    >
      <div className="flex items-start justify-start gap-3">
        <div className="-mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
          <div className="animate-pulse">
            <SparklesIcon size={14} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 md:gap-4">
          <div className="flex items-center gap-1 p-0 text-muted-foreground text-sm">
            <span className="animate-pulse">Thinking</span>
            <span className="inline-flex">
              <span className="animate-bounce [animation-delay:0ms]">.</span>
              <span className="animate-bounce [animation-delay:150ms]">.</span>
              <span className="animate-bounce [animation-delay:300ms]">.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Greeting = () => {
  return (
    <div
      className="mx-auto mt-4 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-16 md:px-8"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="font-semibold text-xl md:text-2xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
      >
        Hello there!
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-xl text-zinc-500 md:text-2xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
      >
        How can I help you today?
      </motion.div>
    </div>
  );
};
