"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers, type User } from "@/app/lib/api";
import Link from "next/link";

export default function Home() {
  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

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