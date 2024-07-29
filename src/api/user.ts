import { User } from "../types";

const API_URL = `/api/user`;

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getUser = async (id:string): Promise<User> => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createUser = async (userData: User): Promise<User> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

