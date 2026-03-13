import { http } from "./http";

export const apiClient = {
    get: <T>(path: string, init?: RequestInit) => 
        http<T>(path, {
            ...init,
            method: "GET"
        }),

    post: <TResponse, TBody = undefined>(path: string, body?: TBody, init?: RequestInit) =>
        http<TResponse>(path, {
            ...init,
            method: "POST",
            body: body !== undefined ? JSON.stringify(body) : undefined,
        }),

    patch: <TResponse, TBody>(path: string, body: TBody, init?: RequestInit) =>
        http<TResponse>(path, {
            ...init,
            method: "PATCH",
            body: body !== undefined ? JSON.stringify(body) : undefined,
        }),
}