import React from "react";
import { ReportMessageData } from "../data/report-message-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react"; // Imported for a clean trigger button style

// Types matching your exact schema structure
interface MessageItem {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  type: "TEXT" | "IMAGE" | string;
  fileUrl: string | null;
  isRead: boolean;
  replyToId: number | null;
  createdAt: string;
}

interface ReportMessageDataProps {
  total: number;
  page: number;
  page_size: number;
  messages: MessageItem[];
}

export function ReportMessages() {
  const data: ReportMessageDataProps = ReportMessageData;
  const leftSideSenderId = data?.messages?.[0]?.senderId;

  return (
    <Dialog>
      {/* ── DIALOG TRIGGER ── */}
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-zinc-800 bg-secondary-0 hover:text-black p-5"
        >
          <Eye className="size-4" />
          <span>View Chat History</span>
        </Button>
      </DialogTrigger>

      {/* ── DIALOG WINDOW CONTAINER ── */}
      <DialogContent className="sm:max-w-xl bg-[#171717] border border-[#262626] text-white overflow-hidden p-0 gap-0">
        
        {/* Header Block */}
        <DialogHeader className="p-6 border-b border-[#262626]">
          <DialogTitle className="text-lg font-semibold tracking-wide text-zinc-100">
            Reported Conversation History
          </DialogTitle>
        </DialogHeader>

        {/* --- CHAT SCROLL CONTAINER --- */}
        <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800">
          {data?.messages?.map((message) => {
            const isLeft = message.senderId === leftSideSenderId;

            // Format the ISO timestamp to a readable time (e.g., 03:45 AM)
            const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            // Dynamic name mapping based on the schema's IDs
            const senderName = message.senderId === 6 ? "Sarah" : "John";

            return (
              <div
                key={message.id}
                className={`flex items-start gap-3 w-full ${
                  isLeft ? "justify-start" : "justify-end flex-row-reverse"
                }`}
              >
                {/* --- AVATAR --- */}
                <div className="size-9 rounded-full bg-[#262626] border border-[#404040] flex items-center justify-center text-xs font-bold text-[#A3A3A3] flex-shrink-0 select-none">
                  {senderName.slice(0, 2).toUpperCase()}
                </div>

                {/* --- BUBBLE & HEADER GROUP --- */}
                <div className={`flex flex-col max-w-[75%] gap-1 ${isLeft ? "items-start" : "items-end"}`}>
                  {/* Sender Name Label */}
                  <span className="text-[#A3A3A3] text-xs font-medium px-1">
                    {senderName}
                  </span>

                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm break-words shadow-sm w-full ${
                      isLeft
                        ? "bg-[#262626] text-white rounded-tl-none border border-[#404040]/40"
                        : "bg-[#2563EB] text-white rounded-tr-none"
                    }`}
                  >
                    {/* Handle Text Messages vs Image Attachments dynamically */}
                    {message.type === "IMAGE" && message.fileUrl ? (
                      <div className="flex flex-col gap-2">
                        <img
                          src={message.fileUrl}
                          alt={message.content}
                          className="rounded-lg max-w-full h-auto max-h-48 object-cover border border-black/20"
                        />
                        <span className="text-xs opacity-80 italic block">
                          {message.content}
                        </span>
                      </div>
                    ) : (
                      <p className="leading-relaxed">{message.content}</p>
                    )}

                    {/* Message Timestamp micro-text */}
                    <span
                      className={`block text-[10px] mt-1 text-right select-none ${
                        isLeft ? "text-[#737373]" : "text-blue-200"
                      }`}
                    >
                      {messageTime}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReportMessages;