import {useRouter} from 'next/navigation';

/**
 *
 * @param path
 * @param options
 */
export async function useFetch(path: string, options: RequestInit = {}) {
    console.log(options);
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (res.status === 401) {
        if (typeof window !== 'undefined') {
            window.location.href = '/signin';
        }
        return;
    }

    if (!res.ok) {
        throw new Error('API error');
    }
    return res.json();
}