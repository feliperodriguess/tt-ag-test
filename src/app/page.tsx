"use client";

import { useRef } from "react";
import {
  ConnectWalletButton,
  CreateProposalForm,
  ProposalsList,
} from "@/components";

export default function Home() {
  const refetchRef = useRef<() => void>(() => {});

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl">
        <ConnectWalletButton />
        <CreateProposalForm onProposalCreated={() => refetchRef.current?.()} />
        <ProposalsList refetchRef={refetchRef} />
      </main>
    </div>
  );
}
