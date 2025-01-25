import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";

interface SearchFieldProps<T> {
  label?: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  fetchData: (query: string) => Promise<T[]>; // Function to fetch data
  renderResults: (result: T) => string; // Function to display result as string
  getId: (result: T) => string; // Function to get the ID from result
  onSelect: (id: string, displayValue: string) => void; // Updated to accept two arguments
}

const SearchField = <T,>({
  label,
  type,
  id,
  name,
  value,
  onChange,
  required,
  fetchData,
  renderResults,
  getId,
  onSelect,
}: SearchFieldProps<T>) => {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(results)

  useEffect(() => {
    const fetchResults = async () => {
      if (value.trim()) {
        setLoading(true);
        try {
          const fetchedData = await fetchData(value);
          setResults(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]); // Clear results if input is empty
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300); // Add a small delay to avoid excessive API calls

    return () => clearTimeout(debounceTimer); // Cleanup timer
  }, [value, fetchData]);

  const handleSelect = (result: T) => {
    const selectedId = getId(result);
    const displayValue = renderResults(result);
    onSelect(selectedId, displayValue); // Pass both ID and display value
    setResults([]); // Clear dropdown after selection
  };

  return (
    <div className="input-container relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
      {loading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Loading />
        </div>
      )}
      {results.length > 0 && (
        <ul className="absolute -bottom-100 left-0 z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.map((result, index) => {
            console.log("result", result)
            return (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleSelect(result)}
              >
                {renderResults(result)}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchField;