// src/api/http.ts

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, init);

    if (!res.ok) throw new Error (`HTTP ${res.status} - ${path}`);

    return res.json() as Promise<T>;
}