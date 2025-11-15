import {useState, useCallback} from "react";

export function useFetch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchApi = useCallback(
        async <T>(path: string, options: RequestInit = {}, returnType: "json" | "blob" = "json"): Promise<T> => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
                    ...options,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        ...(options.headers || {}),
                    },
                });

                // Redirection si non autorisé
                if (res.status === 401) {
                    if (typeof window !== "undefined") {
                        window.location.href = "/signin";
                    }
                    return {} as T; // retourne un objet vide pour satisfaire TS
                }

                if (!res.ok) {
                    throw new Error("API error");
                }

                if (returnType === "blob") return await res.blob() as unknown as T;
                return await res.json() as T;
            } catch (err: unknown) {
                setError(err instanceof Error ? err : new Error("Erreur inconnue"));
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {fetchApi, loading, error}
}