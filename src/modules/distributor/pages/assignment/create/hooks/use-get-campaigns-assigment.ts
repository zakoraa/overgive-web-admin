"use client";

import { useState, useEffect, useCallback } from "react";
import { getCampaigns } from "../services/get-campaigns";

export function useGetCampaignsAssigments(limit = 20) {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setLoading] = useState(false);

    const load = useCallback(
        async (reset = false) => {
            if (isLoading) return;

            const currentPage = reset ? 1 : page;

            setLoading(true);

            const result = await getCampaigns({
                page: currentPage,
                limit,
                search,
            });

            if (reset) {
                setCampaigns(result.data);
            } else {
                setCampaigns((prev) => [...prev, ...result.data]);
            }

            setHasMore(result.hasMore);
            setPage(currentPage + 1);
            setLoading(false);
        },
        [page, search, limit]
    );

    // Load awal
    useEffect(() => {
        load(true);
    }, []);

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => {
            load(true);
        }, 400);

        return () => clearTimeout(t);
    }, [search]);

    return {
        campaigns,
        isLoading,
        hasMore,
        loadMore: () => load(false),
        search,
        setSearch,
        reload: () => load(true),
    };
}
