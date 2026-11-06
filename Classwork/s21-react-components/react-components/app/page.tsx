"use client";

import { useState } from "react";
import Card from "../Components/Card";
import { SAMPLE_INITIATIVES } from "../types/initiatives";

export default function Home() {
  const [initiatives, setInitiatives] = useState(SAMPLE_INITIATIVES);

  const handleVote = (id: string, delta: number) => {
    setInitiatives((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, votes: item.votes + delta } : item
      )
    );
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="row g-4">
          {initiatives.map((item) => (
            <Card key={item.id} initiative={item} onVote={handleVote} />
          ))}
        </div>
      </main>
    </div>
  );
}
