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
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
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
          <StyledTableCell> Product ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">-</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row: any) => (
            <StyledTableRow key={row.id}>
               <StyledTableCell align="center">{row.id}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <img
                  src={row.image}
                  style={{ width: "80px", height: "80px" }}
                />
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">
              <Button variant="contained" startIcon={<DeleteIcon />}
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
