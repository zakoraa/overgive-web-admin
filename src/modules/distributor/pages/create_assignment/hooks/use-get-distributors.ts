"use client";

import { useState, useEffect, useCallback } from "react";
import { getDistributors } from "../services/get-distributors";

export function useGetDistributors(limit = 20) {
    const [distributors, setDistributors] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setLoading] = useState(false);

    const load = useCallback(
        async (reset = false) => {
            // Jangan load kalau sedang loading
            if (isLoading) return;

            const currentPage = reset ? 1 : page;

            setLoading(true);

            const result = await getDistributors({
                page: currentPage,
                limit,
                search,
            });

            if (reset) {
                setDistributors(result.data);
            } else {
                setDistributors((prev) => [...prev, ...result.data]);
            }

            setHasMore(result.hasMore);
            setPage(currentPage + 1);
            setLoading(false);
        },
        // 🚀 HANYA butuh ini
        [page, search, limit]
    );

    // load pertama
    useEffect(() => {
        load(true);
    }, []);

    // debounce search
    useEffect(() => {
        const timeout = setTimeout(() => {
            load(true);
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    return {
        distributors,
        isLoading,
        hasMore,
        loadMore: () => load(false),
        search,
        setSearch,
        reload: () => load(true),
    };
}
