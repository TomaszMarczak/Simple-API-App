import { TextField } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
export const Searchbar = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const [inputValue, setInputValue] = useState<string>(searchQuery);

  const debouncedSearch = debounce(() => setSearchQuery(inputValue), 500);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    debouncedSearch();
  }, [inputValue]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <TextField
      id="products-search"
      label="Search ids..."
      variant="outlined"
      className="shadow"
      value={inputValue}
      onChange={(e) => {
        if (/^\d+$/.test(e.target.value) || e.target.value === "")
          setInputValue(e.target.value);
      }}
    />
  );
};
