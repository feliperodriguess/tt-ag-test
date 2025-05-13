"use client";

import { useReadContract } from "wagmi";
import { MutableRefObject } from "react";
import { GOVERNANCE_CONTRACT_ADDRESS } from "@/lib/constants";

interface ProposalsListProps {
  refetchRef: MutableRefObject<(() => void) | undefined>;
}

export function ProposalsList({ refetchRef }: ProposalsListProps) {
  const { data: proposalCount, refetch } = useReadContract({
    address: GOVERNANCE_CONTRACT_ADDRESS as `0x${string}`,
    abi: [
      {
        inputs: [],
        name: "getProposalCount",
        outputs: [{ type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getProposalCount",
  });

  // Store refetch function in ref
  refetchRef.current = refetch;

  const count = Number(proposalCount || 0);

  return (
    <div className="w-full">
      <h1 className="mb-3 text-2xl font-bold text-white">
        Proposals ({count}):
      </h1>
      <div className="space-y-4">
        {count > 0 ? (
          Array.from({ length: count }, (_, i) => (
            <ProposalItem key={i} proposalId={BigInt(i)} />
          ))
        ) : (
          <p className="text-white">No proposals yet</p>
        )}
      </div>
    </div>
  );
}

function ProposalItem({ proposalId }: { proposalId: bigint }) {
  const { data: proposal } = useReadContract({
    address: GOVERNANCE_CONTRACT_ADDRESS as `0x${string}`,
    abi: [
      {
        inputs: [{ name: "_proposalId", type: "uint256" }],
        name: "getProposal",
        outputs: [
          { name: "id", type: "uint256" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "proposer", type: "address" },
          { name: "timestamp", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getProposal",
    args: [proposalId],
  });

  if (!proposal) return null;

  const [, title, description, proposer, timestamp] = proposal;

  return (
    <div className="border p-4 rounded bg-gray-800 text-white">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2">{description}</p>
      <div className="mt-2 text-sm text-gray-400">
        <p>Proposed by: {proposer}</p>
        <p>Created: {new Date(Number(timestamp) * 1000).toLocaleString()}</p>
      </div>
    </div>
  );
}
