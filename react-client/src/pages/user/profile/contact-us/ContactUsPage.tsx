import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userFeedback } from "../../../../api/user.api";

const ContactUsPage: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const navigate = useNavigate()

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            await userFeedback({ comment: message }).then(() => {

                // Handle success
                toast.success("Message sent successfully!");
                setMessage(""); // Clear the message input
            }).catch((err) => {
                toast.error(err.message || "An error occurred. Please try again.");
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message || "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className=" px-5">
            <div className="rounded-lg w-full flex flex-col justify-between min-h-screen py-5">
                <div>
                    <div className="grid grid-cols-3 items-center py-3 font-nunito-sans text-xl font-semibold">
                        <IoIosArrowBack className="col-span-1 cursor-pointer" onClick={() => navigate('/user/profile')} />
                        <span className="col-span-1 text-center">Contact Us</span>
                    </div>
                    <p className="text-left text-secondary-content mb-6">
                        Don't hesitate to contact us if you find a bug or have a suggestion. We
                        highly appreciate any feedback provided, as it helps us improve your
                        Calorie Tracker.
                    </p>
                </div>

                {/* Contact Info */}
                {/* <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        Contact Info
                    </h2>
                    <p className="text-gray-600">
                        Email:{" "}
                        <a
                            href="mailto:itanlomw@gmail.com"
                            className="text-blue-500 hover:underline"
                        >
                            itanlomw@gmail.com
                        </a>
                    </p>
                </div> */}

                <div>

                    {/* Message Form */}
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Message</h2>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="I found a bug..."
                            rows={4}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-4 bg-primary text-primary-content py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                            {isSubmitting ? "Sending..." : "Send"}
                        </button>
                    </form>

                    {/* Social Links */}
                    {/* <div className="mt-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">
                            Our Social Links
                        </h2>
                        <div className="flex justify-center space-x-4">
                            <a
                                href="#"
                                className="text-blue-500 hover:underline"
                            >
                                Facebook
                            </a>
                            <a
                                href="#"
                                className="text-blue-500 hover:underline"
                            >
                                Twitter
                            </a>
                            <a
                                href="#"
                                className="text-blue-500 hover:underline"
                            >
                                Instagram
                            </a>
                        </div>
                    </div> */}
                </div>

            </div>
        </div>
    );
};

export default ContactUsPage;