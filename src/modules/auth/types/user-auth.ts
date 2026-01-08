export interface UserAuth {
    id: string;
    auth_id: string;
    email: string | null;
    fullName: string | null;
    role?: string | null;
    createdAt?: string;
    confirmedAt?: string | null;
}