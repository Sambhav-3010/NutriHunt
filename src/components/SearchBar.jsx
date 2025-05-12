import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-3 top-3 transform text-gray-400" />
      <input
        type="text"
        className="w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring bg-white dark:bg-gray-700 dark:text-white"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
