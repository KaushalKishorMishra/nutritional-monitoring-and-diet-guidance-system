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
  renderResults: (result: T) => string; // Function to display result as string
  getId: (result: T) => string; // Function to get the ID from result
  onSelect: (id: string) => void; // Callback with the selected ID
}

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
  const [loading, setLoading] = useState(false);

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
        setResults([]);
      }
    };

    fetchResults();
  }, [value, fetchData]);

  const handleSelect = (result: T) => {
    const selectedId = getId(result);
    onChange({
      target: { value: renderResults(result), name },
    } as React.ChangeEvent<HTMLInputElement>);
    onSelect(selectedId);
    setResults([]); // Clear dropdown after selection
  };

  return (
    <div className="input-container">
      <label className="input input-bordered flex items-center gap-2">
        <FiSearch />
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
      {loading && <p>Loading...</p>}
      {results.length > 0 && (
        <ul
          className="search-results mt-4 max-h-60 overflow-y-auto"
          style={{
            maxHeight: "240px", // Fixed height (adjust as per requirement)
            overflowY: "auto", // Scrollable when results exceed max height
          }}
        >
          {results.map((result, index) => (
            <li
              key={index}
              className="cursor-pointer border-b py-2 hover:bg-gray-100"
              onClick={() => handleSelect(result)}
            >
              {renderResults(result)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInputField;
