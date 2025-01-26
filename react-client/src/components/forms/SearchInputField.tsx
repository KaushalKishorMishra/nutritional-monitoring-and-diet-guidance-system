import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputFieldProps<T> {
  label?: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  fetchData: (query: string) => Promise<T[]>; // Function to fetch data
  renderResults: (result: T) => React.ReactNode; // Function to render result as JSX
  getId: (result: T) => string; // Function to get the ID from result
  onSelect: (id: string) => void; // Callback with the selected ID
}

const DEBOUNCE_DELAY = 500; // Time in milliseconds

const SearchInputField = <T,>({
  id,
  name,
  value,
  onChange,
  required,
  fetchData,
  renderResults,
  getId,
  onSelect,
}: SearchInputFieldProps<T>) => {
  const [results, setResults] = useState<T[]>([]);
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Debouncing
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedValue.trim()) {
        console.log("Fetching data for:", debouncedValue); // Debug: Check query
        setLoading(true);
        try {
          const fetchedData = await fetchData(debouncedValue);
          console.log("Fetched results:", fetchedData); // Debug: Check results
          setResults(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Query is empty"); // Debug: Empty query
        setResults([]);
      }
    };

    fetchResults();
  }, [debouncedValue, fetchData]);

  const handleSelect = (result: T) => {
    const selectedId = getId(result);
    const displayValue = renderResults(result);

    // Ensure displayValue is not null or undefined before calling toString()
    onChange({
      target: { value: displayValue?.toString() || "", name },
    } as React.ChangeEvent<HTMLInputElement>);

    onSelect(selectedId);
    setResults([]);
  };

  return (
    <div>
      <label className="input input-bordered input-primary flex w-full max-w-xs items-center justify-between">
        <FiSearch className="me-2 text-base-300" />
        <input
          type="text"
          className="grow"
          placeholder="Search..."
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
        />
      </label>
      {loading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}
      {results && results?.length > 0 ? (
        <ul className="search-results mt-4 max-h-60 overflow-y-auto transition-all duration-300">
          {results.map((result, index) => (
            <li
              key={index}
              className="cursor-pointer border-b py-2 transition-all duration-300 hover:bg-gray-100"
              onClick={() => handleSelect(result)}
            >
              {renderResults(result)}
            </li>
          ))}
        </ul>
      ) : (
        !loading &&
        debouncedValue && (
          <p className="w-full bg-base-100 py-5 text-center font-bold">
            No results found
          </p>
        )
      )}
    </div>
  );
};

export default SearchInputField;