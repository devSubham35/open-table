"use client"

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchComponent from "@/components/global/search/SearchComponent";

const SearchHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("searchQuery") || "";
  const [queryValue, setQueryValue] = useState<string>(searchQuery);

  // keep state in sync if the URL changes
  useEffect(() => {
    setQueryValue(searchQuery);
  }, [searchQuery]);

  const handleOnSearch = (value: string) => {
    router.replace(`/search?searchQuery=${value}`);
  };

  const handleOnClear = () => {
    setQueryValue("");
    router.replace(`/search`); // remove query param from url
  };

  return (
    <div className="w-full h-[90px] bg-gray-50/5 flex justify-center items-center">
      <SearchComponent 
        value={queryValue} 
        onChange={setQueryValue} 
        onSearch={handleOnSearch}
        onClear={handleOnClear}
      />
    </div>
  );
};

export default SearchHeader;
