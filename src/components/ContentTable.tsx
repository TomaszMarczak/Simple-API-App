import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { Spinner, Stack } from "react-bootstrap";
import { useSearchContext } from "../context/SearchContext";
import { ProductObject } from "../types/appTypes";
import { Pagination } from "./Pagination";

export const ContentTable = () => {
  const { response, loading, statusCode, setModalId, perPage, page } =
    useSearchContext();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page === response?.total_pages ? perPage - response?.data.length : 0;

  if (loading)
    return (
      <Stack className="align-items-center mt-5">
        <Spinner />
      </Stack>
    );

  switch (statusCode.current) {
    case 404:
      return (
        <Stack className="align-items-center mt-5">
          <h2>Couldn't find any resources :(</h2>
        </Stack>
      );
    case 500:
      return (
        <Stack className="align-items-center mt-5">
          <h2>Problem on the server side</h2>
        </Stack>
      );
    default:
      return (
        <>
          <TableContainer className="border rounded my-3 shadow">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="fw-bold"
                    sx={{ borderBottom: "none" }}
                    align="center"
                  >
                    ID
                  </TableCell>
                  <TableCell
                    className="fw-bold w-75"
                    sx={{ borderBottom: "none" }}
                    align="center"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    className="fw-bold"
                    sx={{ borderBottom: "none" }}
                    align="center"
                  >
                    Year
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  {response?.data?.map((productObject: ProductObject) => (
                    <TableRow
                      key={productObject.id.toString()}
                      sx={{
                        backgroundColor: productObject.color,
                        cursor: "pointer",
                      }}
                      onClick={() => setModalId(productObject.id)}
                    >
                      <TableCell sx={{ borderBottom: "none" }} align="center">
                        {productObject.id.toString()}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }} align="center">
                        {productObject.name}
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }} align="center">
                        {productObject.year.toString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow style={{ height: 52 * emptyRows }}></TableRow>
                </>
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination />
        </>
      );
  }
};
