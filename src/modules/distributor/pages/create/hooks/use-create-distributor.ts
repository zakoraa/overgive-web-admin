import { useState } from "react";
import { Distributor } from "@/modules/distributor/types/distributor";
import { createDistributor } from "../services/create-distributor";

export const useCreateDistributor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [distributor, setDistributor] = useState<Distributor | null>(null);

    const submit = async (fullName: string, email: string) => {
        setLoading(true);
        setError(null);

        try {
            const result = await createDistributor(fullName, email);
            if (!result) {
                setError("Gagal membuat distributor");
                return null;
            }
            setDistributor(result);
            return result;
        } catch (err) {
            console.error(err);
            setError("Terjadi kesalahan pada server");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading, error, distributor };
};
