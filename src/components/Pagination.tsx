import { Button, Stack } from "@mui/material";
import { useSearchContext } from "../context/SearchContext";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export const Pagination = () => {
  const { page, setPage, response } = useSearchContext();

  const handlePageUp = () => {
    if (response?.total_pages && page < response.total_pages)
      setPage((prevPage) => prevPage + 1);
  };
  const handlePageDown = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  if (response === null || response.total_pages === undefined) return null;

  return (
    <Stack direction="row" className="my-2">
      <Button variant="outlined" onClick={handlePageDown} disabled={page === 1}>
        <KeyboardArrowLeftIcon />
      </Button>
      <div className="h-100 text-align-center my-auto mx-2 fs-5">{`${page}/${response?.total_pages}`}</div>
      <Button
        variant="outlined"
        onClick={handlePageUp}
        disabled={page === response?.total_pages}
      >
        <KeyboardArrowRightIcon />
      </Button>
    </Stack>
  );
};
