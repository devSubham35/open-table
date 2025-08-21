"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SearchComponentProps {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onClear?: () => void
}

const SearchComponent = ({ value, onChange, onSearch, onClear }: SearchComponentProps) => {
  const handleSearch = () => {
    if (value?.trim()) {
      onSearch?.(value.trim());
    }
  };

  const handleClear = () => {
    onChange?.("");
    onClear?.(); // now updates URL too
  };

  return (
    <div className="flex justify-center items-center gap-3">
      <div className="relative w-[500px]">
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Search by name, location, region..."
          className="w-full h-[50px] pr-10 bg-white text-black dark:bg-white dark:text-black"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <X size={18} className="cursor-pointer" />
          </button>
        )}
      </div>
      <Button
        onClick={handleSearch}
        className="h-[48px] px-10 text-base"
      >
        Search
      </Button>
    </div>
  )
};

export default SearchComponent;