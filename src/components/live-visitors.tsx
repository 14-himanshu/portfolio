"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export function LiveVisitors() {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Only connect if the environment variables are set
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) {
      console.warn("Pusher environment variables are missing. Live presence is disabled.");
      return;
    }

    // Initialize Pusher client
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: "/api/pusher/auth",
    });

    // Subscribe to the presence channel
    // Pusher presence channels MUST be prefixed with 'presence-'
    const channel = pusher.subscribe("presence-portfolio");

    // When we successfully subscribe, we get the initial list of all members
    channel.bind("pusher:subscription_succeeded", (members: { count: number }) => {
      setVisitorCount(members.count);
    });

    // When someone new joins the portfolio
    channel.bind("pusher:member_added", () => {
      setVisitorCount((prev) => prev + 1);
    });

    // When someone leaves the portfolio
    channel.bind("pusher:member_removed", () => {
      setVisitorCount((prev) => prev - 1);
    });

    // Cleanup on unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  // Don't show until we have a confirmed count from Pusher
  if (visitorCount === 0) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 shadow-sm transition-all">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
      </span>
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
        <span className="text-foreground font-bold">{visitorCount}</span> {visitorCount === 1 ? "person" : "people"} viewing
      </span>
    </div>
  );
}
