export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
};

export type CreateUserPayload = {
  name: string;
  email: string;
  phone?: string;
  website?: string;
};

export type UpdateUserPayload = CreateUserPayload;

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

export const createUser = async (payload: CreateUserPayload) => {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    payload
  );
  if (!res) {
    throw new Error("Failed to create user");
  }
  return res.data;
};

export const updateUser = async (id: string, payload: UpdateUserPayload) => {
  const res = await axios.put(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    payload
  );
  if (!res) {
    throw new Error("Failed to update user");
  }
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!res) {
    throw new Error("Failed to delete user");
  }
  return id;
};