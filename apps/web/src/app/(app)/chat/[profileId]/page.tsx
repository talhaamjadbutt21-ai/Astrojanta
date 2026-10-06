import type { Metadata } from "next";
import { ChatScreen } from "./chat-screen";

export const metadata: Metadata = { title: "AI Astrologer" };

export default async function ChatPage({ params }: PageProps<"/chat/[profileId]">) {
  const { profileId } = await params;
  return <ChatScreen profileId={profileId} />;
}
