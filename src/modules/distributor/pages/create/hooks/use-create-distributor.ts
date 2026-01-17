import { useState } from "react";
import { Distributor } from "@/modules/distributor/types/distributor";
import { createDistributor } from "../services/create-distributor";
import generatePassword from "generate-password";
import { sendGeneratePassword } from "../services/send-generate-password";
import { ActionResult } from "@/core/types/action-result";

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
            const result: ActionResult<Distributor> = await createDistributor(fullName, email, password);
            console.log("RESulT : ", result)
            if (!result.success) {
                setError(result.message);
                return null;
            }
            setDistributor(result.data);
            return result;
        } catch (err) {
            // console.error(err);
            setError("Terjadi kesalahan pada server");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading, error, distributor };
};
