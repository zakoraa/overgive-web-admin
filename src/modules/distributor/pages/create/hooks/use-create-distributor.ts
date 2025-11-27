import { useState } from "react";
import { Distributor } from "@/modules/distributor/types/distributor";
import { createDistributor } from "../services/create-distributor";
import generatePassword from "generate-password";
import { sendGeneratePassword } from "../services/send-generate-password";

export const useCreateDistributor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [distributor, setDistributor] = useState<Distributor | null>(null);

    const submit = async (fullName: string, email: string) => {
        setLoading(true);
        setError(null);

        try {
            const password = generatePassword.generate({
                length: 12,
                numbers: true,
                symbols: true,
                uppercase: true,
                strict: true,
            });

            const sendResult = await sendGeneratePassword(fullName, email, password)
            if (!sendResult) {
                setError("Gagal membuat distributor");
                return null;
            }
            const result = await createDistributor(fullName, email, password);
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
