import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { ResponseObject } from "../types/appTypes";
import { useNavigate, useSearchParams } from "react-router-dom";

type ContextProviderProps = {
  children: ReactNode;
};

type ContextTypes = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  response: ResponseObject | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  statusCode: { current: number };
  modalId: number | null;
  setModalId: React.Dispatch<React.SetStateAction<number | null>>;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
};

const SearchContext = createContext({} as ContextTypes);

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    () => searchParams.get("id") || "" // Initialize the search query state using the search params
  );
  const [response, setResponse] = useState<ResponseObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(() => {
    const parsedPage = parseInt(searchParams.get("page") || "1");
    return parsedPage < 1 ? 1 : parsedPage; // Return 1 if parsedPage is less than 1
  });
  const [modalId, setModalId] = useState<number | null>(null);
  const [perPage, setPerPage] = useState<number>(5);
  const statusCode = useRef<number>(0);
  const navigate = useNavigate();
  // Endpoint URL for the API
  const API_URL = "https://reqres.in/api/products/";

  // Make a GET request to the API
  useEffect(() => {
    setLoading(() => true);
    let searchParams = new URLSearchParams();
    searchQuery ? searchParams.append("id", searchQuery) : null;
    page > 1 ? searchParams.append("page", page.toString()) : null;
    navigate(location.pathname + "?" + searchParams.toString());
    axios
      .get(API_URL, {
        params: {
          id: searchQuery.length > 0 ? searchQuery : null, // Send the search query as a parameter if it exists
          page: page === 1 ? null : page, // Send the current page number as a parameter if it's not 1
          per_page: searchQuery.length > 0 ? null : perPage, // Send the number of items per page as a parameter if no search query exists
        },
      })
      .then((res) => {
        // Check for a successful response (status code in the 200s)
        if (res.status >= 200 && res.status < 300) {
          statusCode.current = res.status;
          if (res.data.data instanceof Array) setResponse(res.data);
          else {
            res.data.data = Array.of(res.data.data); //Convert response data object to array to have same data type throughout application
            setResponse(res.data);
          }
          setPage(() =>
            res.data.page > res.data.total_pages // If the current page number is greater than the total number of pages, set it to the last page
              ? res.data.total_pages
              : res.data.page
          );
        } else {
          // API responds with an error if status code is !== 200 so below section is not used
          statusCode.current = res.status;
          setResponse(null);
          setPage(1);
        }
        setLoading(() => false);
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        statusCode.current = error.response.status;
        setResponse(null);
        setPage(1);
        setLoading(() => false);
      });
  }, [page, searchQuery]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        response,
        page,
        setPage,
        loading,
        statusCode,
        modalId,
        setModalId,
        perPage,
        setPerPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
