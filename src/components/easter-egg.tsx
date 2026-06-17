"use client";

import { useEffect } from "react";

export function EasterEgg() {
  useEffect(() => {
    // Only run this in the browser, and only run it once
    if (typeof window !== "undefined") {
      const ascii = `
    __  ___                                __         
   / / / (_)___ ___  ____ _____  _____/ /_  __  __
  / /_/ / / __ \`__ \\/ __ \`/ __ \\/ ___/ __ \\/ / / /
 / __  / / / / / / / /_/ / / / (__  ) / / / /_/ / 
/_/ /_/_/_/ /_/ /_/\\__,_/_/ /_/____/_/ /_/\\__,_/  
      `;
      
      console.log(
        `%c${ascii}`,
        "font-family: monospace; color: #10B981; font-weight: bold;"
      );
      
      console.log(
        "%cHey there! Looking under the hood? I like your style.",
        "font-size: 16px; font-weight: bold; color: #fff; background-color: #000; padding: 4px 8px; border-radius: 4px;"
      );
      
      console.log(
        "%cIf you are an engineering manager or recruiter looking for someone who cares about the details, let's talk.\n📫 himanshupandey.sde@gmail.com",
        "font-size: 14px; font-family: monospace; color: #888; padding-top: 10px;"
      );
    }
  }, []);

  return null;
}
