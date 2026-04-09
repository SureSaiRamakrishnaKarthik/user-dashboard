"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, fetchUsers, type User } from "@/app/lib/api";
import Link from "next/link";

export default function Home() {
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: () => createUser({ name: createName, email: createEmail }),     
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (prev: User[] | undefined) => [       
        ...(prev || []),
        newUser,
      ]);
      queryClient.setQueryData(["user", String(newUser.id)], newUser);
      setCreateName("");
      setCreateEmail("");
    },
  });

  const handleCreate = () => {
    if (createName.trim() && createEmail.trim()) {
      createUserMutation.mutate();
      setCreateName("");
      setCreateEmail("");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      <div className="mt-4 space-y-2 border p-3 rounded">
        <h2 className="text-lg font-semibold">Create User</h2>
        <input
          className="w-full border rounded p-2"
          placeholder="Name"
          value={createName}
          onChange={(e) => setCreateName(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Email"
          value={createEmail}
          onChange={(e) => setCreateEmail(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-3 py-2 rounded disabled:opacity-60"
          onClick={handleCreate}
          disabled={createUserMutation.isPending}
        >
          {createUserMutation.isPending ? "Creating..." : "Create User"}        
        </button>
      </div>

      {data?.map((user) => (
        <div key={user.id} className="border p-3 mt-3 rounded">
          <Link href={`/users/${user.id}`}>
            <p className="text-blue-500 cursor-pointer">
              {user.name}
            </p>
          </Link>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
