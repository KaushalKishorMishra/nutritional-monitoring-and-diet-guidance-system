import { useState } from "react";
import { FaClock } from "react-icons/fa";

interface PCustomTimePicker {
    value: string; // The selected time value
    onChange: (time: string) => void; // Callback when the time changes
}

const CustomTimePicker: React.FC<PCustomTimePicker> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Generate hours and minutes for the dropdown
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

    // Handle time selection
    const handleTimeChange = (hour: string, minute: string) => {
        const newTime = `${hour}:${minute}`;
        onChange(newTime); // Notify parent component of the new time
        setIsOpen(false); // Close the dropdown
    };

    return (
        <div className="relative mx-auto">
            {/* Input field with icon */}
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    readOnly
                    onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
                    className="w-full rounded-lg border border-gray-300 p-2 pl-10 focus:outline-primary focus:ring-1 focus:ring-primary"
                />
                {/* Clock icon */}
                <div className="absolute inset-y-0 right-3 flex items-center pl-3 pointer-events-none">
                    <FaClock className="text-primary text-xl" />
                </div>
            </div>

            {/* Custom dropdown for time selection */}
            {isOpen && (
                <div className="absolute z-10 max-h-52 mt-2 py-2 flex w-full rounded-lg border border-gray-300 bg-white shadow-lg overflow-auto">
                    {/* Hours dropdown */}
                    <div className="flex-1 overflow-y-auto px-5 relative">
                        <h3 className="mb-2 text-sm font-semibold sticky top-0 bg-white">Hours</h3>
                        {hours.map((hour) => (
                            <div
                                key={hour}
                                onClick={() => handleTimeChange(hour, value?.split(":")[1] || "00")}
                                className="cursor-pointer rounded p-1 hover:bg-accent hover:text-accent-content text-center"
                            >
                                {hour}
                            </div>
                        ))}
                    </div>

                    {/* Minutes dropdown */}
                    <div className="flex-1 overflow-y-auto px-5 relative">
                        <h3 className="mb-2 text-sm font-semibold sticky top-0 bg-white">Minutes</h3>
                        {minutes.map((minute) => (
                            <div
                                key={minute}
                                onClick={() => handleTimeChange(value?.split(":")[0] || "00", minute)}
                                className="cursor-pointer rounded p-1 hover:bg-accent hover:text-accent-content text-center"
                            >
                                {minute}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomTimePicker;