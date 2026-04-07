export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
};

import axios from "axios";

export const fetchUsers = async () => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (!res) {
    throw new Error("Failed to fetch users");
  }
  return res.data;
};

export const fetchUserById = async (id: string) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!res) {
    throw new Error("Failed to fetch user");
  }
  return res.data;
};