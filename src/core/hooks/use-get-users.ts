"use client";

import { useState, useEffect, useCallback } from "react";
import { getUsers } from "../services/get-users";
import { User, UserRole } from "../types/user";

export function useGetUsers(limit = 10, initialRole: UserRole = "distributor") {
    const [users, setUsers] = useState<User[]>([]);
    const [role, setRole] = useState<UserRole>(initialRole);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setLoading] = useState(false);

    const load = useCallback(
        async (reset = false, overridePage?: number) => {
            if (isLoading) return;

            const currentPage = reset ? 1 : overridePage ?? page;
            setLoading(true);

            const result = await getUsers({
                page: currentPage,
                limit,
                search,
                role,
            });

            if (reset) {
                setUsers(result.data);
            } else {
                setUsers((prev) => [...prev, ...result.data]);
            }

            setHasMore(result.hasMore);
            setTotalPages(result.totalPages ?? 1);
            setPage(currentPage);
            setLoading(false);
        },
        [page, limit, search, role, isLoading]
    );

    useEffect(() => {
        load(true);
    }, []);

    useEffect(() => {
        const t = setTimeout(() => {
            load(true);
        }, 400);
        return () => clearTimeout(t);
    }, [search]);

    useEffect(() => {
        setRole(initialRole);
    }, [initialRole]);

    useEffect(() => {
        load(true);
    }, [role]);

    return {
        users,
        isLoading,
        hasMore,
        totalPages,
        role,
        setRole: (r: UserRole) => {
            setPage(1);
            setRole(r);
        },
        search,
        page,
        setSearch,
        setPage,
        loadMore: () => load(false),
        reload: () => load(true),
    };
}
