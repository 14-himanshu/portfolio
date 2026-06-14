import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(request: Request) {
  try {
    const data = await request.text();
    const params = new URLSearchParams(data);
    const socketId = params.get("socket_id");
    const channelName = params.get("channel_name");

    if (!socketId || !channelName) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // We assign a random user_id to every anonymous visitor
    const randomUserId = Math.random().toString(36).substring(2, 15);

    const presenceData = {
      user_id: randomUserId,
      user_info: {
        // You can add more info here if you want (e.g. location, timezone)
        isAnonymous: true,
      },
    };

    const authResponse = pusher.authorizeChannel(
      socketId,
      channelName,
      presenceData
    );

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Pusher Auth Error:", error);
    return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 });
  }
}
