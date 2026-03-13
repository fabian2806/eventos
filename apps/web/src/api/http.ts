// src/api/http.ts

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function http<T>(path: string, init?: RequestInit): Promise<T> {

    console.log(`Iniciando llamada a ${BASE_URL}${path}`);

    //const res = await fetch(`${BASE_URL}${path}`, init);

    const res = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...init?.headers
        }
    })

    console.log("El response es:", res);

    if (!res.ok) throw new Error (`HTTP ${res.status} - ${path}`);

    return res.json() as Promise<T>;
}