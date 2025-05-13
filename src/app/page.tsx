"use client";

import { useState } from "react";
import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { sepolia } from "wagmi/chains";

import { styles } from "@/lib/constants";
import { Proposal } from "@/types";

export default function Home() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();

  const [proposals] = useState<Proposal[]>([
    {
      id: 1,
      title: "Proposal 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Proposal 2",
      description: "Description 2",
    },
  ]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {isConnected ? (
            <p className="border border-green-400 font-[family-name:var(--font-geist-mono)] py-2 px-4 rounded-full text-white text-lg">
              Your Connected Wallet: {address}
            </p>
          ) : (
            <button
              className={styles.button}
              onClick={() => connect({ connector: connectors[0] })}
            >
              Connect Wallet
            </button>
          )}

          {isConnected && chainId !== sepolia.id && (
            <button
              className={styles.button}
              onClick={() => switchChain({ chainId: sepolia.id })}
            >
              Switch To Sepolia
            </button>
          )}
        </div>

        <ol className="list-inside list-decimal text-lg text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <h1 className="mb-3 text-2xl font-bold">Proposals:</h1>
          {proposals.map((proposal) => (
            <li key={proposal.id} className="mb-2 tracking-[-.01em]">
              {proposal.title}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
