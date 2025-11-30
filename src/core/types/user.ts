export type UserRole = "admin" | "distributor" | "donor" | string;

export interface User {
    id: string;
    auth_id: string,
    name: string | null;
    email: string | null;
    role: UserRole;
    created_at: string;
    deleted_at: string | null;
}

export interface UserQueryParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface PaginatedUsers {
    data: User[];
    total: number;
    page: number;
    limit: number;
}
