"use client";

import { useAccount, useConnect, useSwitchChain } from "wagmi";
import { sepolia } from "wagmi/chains";

import { styles } from "@/lib/constants";

export function ConnectWalletButton() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();

  return (
    <div className="flex flex-col gap-4 items-center">
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
  );
}
