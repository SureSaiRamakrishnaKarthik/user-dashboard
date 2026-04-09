"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, fetchUserById, type UpdateUserPayload, type User, updateUser } from "@/app/lib/api";

export default function UserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
  });

  const updateUserMutation = useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/");
    },
  });

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const phone = (formData.get("phone") as string).trim() || undefined;
    const website = (formData.get("website") as string).trim() || undefined;
    
    if (!name || !email) {
      return;
    }
    updateUserMutation.mutate({
      name,
      email,
      phone,
      website,
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>User not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit User</h1>
      <form onSubmit={handleUpdate} className="mt-4 space-y-2 border p-3 rounded">
        <input
          className="w-full border rounded p-2"
          name="name"
          placeholder="Name"
          defaultValue={data?.name ?? ""}
        />
        <input
          className="w-full border rounded p-2"
          name="email"
          placeholder="Email"
          type="email"
          defaultValue={data?.email ?? ""}
        />
        <input
          className="w-full border rounded p-2"
          name="phone"
          placeholder="Phone (optional)"
          defaultValue={data?.phone ?? ""}
        />
        <input
          className="w-full border rounded p-2"
          name="website"
          placeholder="Website (optional)"
          defaultValue={data?.website ?? ""}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-60"
            disabled={updateUserMutation.isPending}
          >
            {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-3 py-2 rounded disabled:opacity-60"
            onClick={() => deleteUserMutation.mutate()}
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </form>
    </div>
  );
}