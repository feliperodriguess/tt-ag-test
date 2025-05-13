"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { GOVERNANCE_CONTRACT_ADDRESS, styles } from "@/lib/constants";

interface CreateProposalFormProps {
  onProposalCreated: () => void;
}

export function CreateProposalForm({
  onProposalCreated,
}: CreateProposalFormProps) {
  const { isConnected } = useAccount();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { writeContractAsync, data: createProposalData } = useWriteContract();

  const { isLoading: isCreating, isSuccess } = useWaitForTransactionReceipt({
    hash: createProposalData,
  });

  useEffect(() => {
    if (isSuccess) {
      onProposalCreated();
      setTitle("");
      setDescription("");
    }
  }, [isSuccess, onProposalCreated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      try {
        await writeContractAsync({
          address: GOVERNANCE_CONTRACT_ADDRESS as `0x${string}`,
          abi: [
            {
              inputs: [
                { name: "_title", type: "string" },
                { name: "_description", type: "string" },
              ],
              name: "createProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          functionName: "createProposal",
          args: [title, description],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!isConnected) return null;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label className="block mb-2 text-white">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded bg-gray-800 text-white"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-white">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded bg-gray-800 text-white"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isCreating}
        className={`${styles.button} w-full`}
      >
        {isCreating ? "Creating..." : "Create Proposal"}
      </button>
    </form>
  );
}
