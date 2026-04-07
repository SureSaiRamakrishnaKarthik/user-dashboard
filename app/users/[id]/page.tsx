"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById, type User } from "@/app/lib/api";

export default function UserPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>User not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p>{data.email}</p>
      <p>{data.phone}</p>
      <p>{data.website}</p>
    </div>
  );
}