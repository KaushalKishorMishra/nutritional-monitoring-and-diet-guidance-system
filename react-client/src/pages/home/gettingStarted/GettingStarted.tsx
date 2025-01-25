import React, { useState } from "react";
import useGettingStartedStore from "../../hooks/store/gettingStarted.store";
import GettingStartedForm from "../../components/forms/gettingStarted/GettingStartedForm";
import { useNavigate } from "react-router";
import { updateUserDetails } from "../../api/user.api";

const GettingStarted: React.FC = () => {
  const { getAllData, clearAllData } = useGettingStartedStore();
  const navigate = useNavigate();
  // State to track the loading, error, and success states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = getAllData();
    setError(null);
    setSuccessMessage(null);

    try {
      // Set loading to true while the request is in progress
      setLoading(true);

      // Call the gettingStarted API function
      const response = await updateUserDetails(data);
      console.log("API response:", response);

      // Set success message
      setSuccessMessage("Data successfully updated!");

      navigate("/login");
      // Optionally clear the store data after API call
      clearAllData();
    } catch (error) {
      // Set error message in case of failure
      setError("There was an error while updating your data.");
      console.error("Error during API call:", error);
    } finally {
      // Set loading to false after the request is finished (success or failure)
      setLoading(false);
    }
  };

  return (
    <div>
      <GettingStartedForm onSubmit={onSubmit} />

      {/* Show a loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Show success message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* Show error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GettingStarted;
