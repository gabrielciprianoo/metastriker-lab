"use client";

import { Button } from "@/components/ui/button";
import { BoltIcon, FireIcon } from "@heroicons/react/24/solid";

type Props = {
  openMeta: () => void;
  openStrike: () => void;
};

export function MatchEventControls({ openMeta, openStrike }: Props) {
  return (
    <div className="flex gap-3 mt-4">
      {/* META BUTTON */}
      <Button
        onClick={openMeta}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
      >
        <BoltIcon className="w-5 h-5" />
        Registrar Meta (acierto)
      </Button>

      {/* STRIKE BUTTON */}
      <Button
        onClick={openStrike}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 cursor-pointer"
      >
        <FireIcon className="w-5 h-5" />
        Registrar Strike (error)
      </Button>
    </div>
  );
}
