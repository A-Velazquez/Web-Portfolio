"use client";

import Link from "next/link";
import { Initiative } from "../types/initiatives";

const Card = ({ initiative, onVote, }: { initiative: Initiative; onVote: (id: string, delta: number) => void; }) => {
  return (
    <div>
      <Link
        href={`/Detail/${initiative.id}`}
        className="flex h-full flex-col justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-indigo-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500"
      >
        <h2 className="text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
          {initiative.title}
        </h2>
        <span className="w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {initiative.votes} votos
        </span>
      </Link>

      <div className="mt-2 flex items-center gap-2">
        <button onClick={() => onVote(initiative.id, -1)}>−</button>
        <button onClick={() => onVote(initiative.id, 1)}>+</button>
      </div>
    </div>
  );
};

export default Card;