import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { resetPassword } from "../../../api/auth.api";
import useUserDataStore from "../../../hooks/store/userData.store";
import { useLoadingStore } from "../../../hooks/store/loading.store";
import PasswordResetForm from "../../../components/forms/passwordReset/PasswordResetForm";
import Loading from "../../../components/loading/Loading";
import { toast } from "react-toastify";

const PasswordReset: React.FC = () => {
    const navigate = useNavigate();

    const { loading, setLoading } = useLoadingStore()
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { setUserData } = useUserDataStore();

    const [passwordResetFormValues, setPasswordResetFormValues] = useState({
        email: localStorage.getItem("email") || "",
        newPassword: "",
        token: ""
    });

    // in case the otp is in the params
    useEffect(() => {
        setPasswordResetFormValues((prev) => ({ ...prev, email: sessionStorage.getItem("verificationEmail") || "" }))

        const urlParams = new URLSearchParams(window.location.search)
        // converted to base64 just to hide it from the url
        const encryptedOtp = urlParams.get("otp")
        const otp = atob(encryptedOtp || "")
        const encryptedEmail = urlParams.get("email")
        const email = atob(encryptedEmail || "")
        if (otp && otp.length === 6) {
            setPasswordResetFormValues((prev) => ({ ...prev, token: otp }))
        }
        if (email) {
            setPasswordResetFormValues((prev) => ({ ...prev, email: email }))
        }
    }, [])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            await resetPassword(passwordResetFormValues.email, passwordResetFormValues.newPassword, passwordResetFormValues.token)
                .then((response) => {
                    setUserData({ ...response.payload });
                    toast.success("Logged in successful!");
                    navigate("/user/dashboard");
                })
                .catch((err) => {
                    toast.error(
                        err?.response?.data?.message ||
                        "An error occurred. Please try again."
                    );
                });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(`Error:, ${err}`);
            setError(
                err?.response?.data?.message || "An error occurred. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form relative">
            <div className="form-header">
                <h2 className="title">Login</h2>
            </div>
            <div className="form-body">
                <PasswordResetForm
                    passwordResetFormValues={passwordResetFormValues}
                    setPasswordResetFormValues={setPasswordResetFormValues}
                    onSubmit={onSubmit}
                />
                {successMessage && (
                    <p className="text-center text-green-600">{successMessage}</p>
                )}
                {error && <p className="text-center text-red-600">{error}</p>}
            </div>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default PasswordReset;
