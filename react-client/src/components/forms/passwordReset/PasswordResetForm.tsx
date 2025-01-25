import React from 'react'
import { useNavigate } from 'react-router';
import InputField from '../InputField';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../../api/auth.api';

interface PPasswordResetForm {
    passwordResetFormValues: {
        email: string
        token: string
        newPassword: string;
    }
    setPasswordResetFormValues: React.Dispatch<React.SetStateAction<{
        email: string
        token: string;
        newPassword: string;
    }>>
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PasswordResetForm: React.FC<PPasswordResetForm> = ({
    passwordResetFormValues,
    setPasswordResetFormValues,
    onSubmit
}) => {
    const navigate = useNavigate();

    // Array of input field configurations
    const inputFields = [
        {
            label: "Token:",
            type: "text",
            id: "token",
            name: "token",
            value: passwordResetFormValues.token,
        },
        {
            label: "New Password:",
            type: "password",
            id: "newPassword",
            name: "newPassword",
            value: passwordResetFormValues.newPassword,
        },
    ];

    // Helper function to handle input changes
    const handleChange =
        (field: keyof typeof passwordResetFormValues) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setPasswordResetFormValues((prev) => ({ ...prev, [field]: e.target.value }));
            };

    return (
        <form onSubmit={onSubmit} className="form-container">
            {inputFields.map((field) => (
                <InputField
                    key={field.id}
                    label={field.label}
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    value={field.value}
                    onChange={handleChange(field.name as keyof typeof passwordResetFormValues)}
                    required
                />
            ))}
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <button
                    type="submit"
                    className="btn btn-primary w-full font-dm-sans text-lg text-white"
                >
                    Reset Password
                </button>
                <div>
                    <p className="text-center font-dm-sans text-[#6e7179]">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="px-2 text-primary underline-offset-2 hover:underline"
                        >
                            Get Started
                        </span>
                    </p>
                    <p className="text-center font-dm-sans text-[#6e7179]">
                        <span
                            onClick={async () => {
                                try {
                                    const email = sessionStorage.getItem("verificationEmail");
                                    if (!email) {
                                        toast.error("Email not found. Please try again by writing your email.");
                                        navigate("/forgot-password");
                                        return
                                    }
                                    await forgotPassword(email).then(() => {
                                        toast.success("Email sent successfully. Please check your inbox.");
                                    })
                                } catch (err) {
                                    toast.error(`An error occurred. Please try again.: ${err}`);
                                }
                            }}
                            className="px-2 text-primary underline-offset-2 hover:underline"
                        >
                            Resend Token?{" "}
                        </span>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default PasswordResetForm
