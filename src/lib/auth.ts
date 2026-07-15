export interface AuthUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthResponse {
  message: string;
  token?: string;
  user?: AuthUser;
  errors?: Record<string, string[]>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const tokenKey = "golperPetalsToken";
const userKey = "golperPetalsUser";

async function parseResponse(response: Response): Promise<AuthResponse> {
  const data = (await response.json()) as AuthResponse;

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return parseResponse(response);
}

export async function loginUser(input: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await parseResponse(response);

  if (!data.token || !data.user) {
    throw new Error("Login response is missing authentication data");
  }

  localStorage.setItem(tokenKey, data.token);
  localStorage.setItem(userKey, JSON.stringify(data.user));

  return data;
}

export async function getCurrentUser() {
  const token = getStoredToken();

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await parseResponse(response);

  if (!data.user) {
    throw new Error("User profile was not returned");
  }

  localStorage.setItem(userKey, JSON.stringify(data.user));

  return data.user;
}

export function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(tokenKey);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = localStorage.getItem(userKey);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}
