import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingSpinners from "./ui/LoadingSpinners";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Link } from "react-router-dom";

const StyledTableCell: any = styled(TableCell)(({ theme }: any) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface AdminProductList {
  data: any;
  remove: (id: number) => void;
  isLoadingDeletedElement: boolean;
}

const AdminProductList = ({
  data,
  remove,
  isLoadingDeletedElement,
}: AdminProductList) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Product ID</StyledTableCell>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="left">Image</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Update Product</StyledTableCell>
            <StyledTableCell align="center">Delete Product</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">{row.id}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="left">
                <img
                  src={row.image}
                  style={{ width: "80px", height: "80px" }}
                />
              </StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<UpgradeIcon />}
                  component={Link}
                  to={`/update-product/${row.id}`}
                  disabled={isLoadingDeletedElement ? true : false}
                >
                  {isLoadingDeletedElement ? (
                    <LoadingSpinners three_dots />
                  ) : (
                    "Update"
                  )}
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => remove(row.id)}
                  disabled={isLoadingDeletedElement ? true : false}
                >
                  {isLoadingDeletedElement ? (
                    <LoadingSpinners three_dots />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminProductList;
