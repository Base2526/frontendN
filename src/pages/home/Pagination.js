import React, { useState, useEffect, withStyles } from "react";
import Container from "@mui/material/Container";
import TablePagination from "@mui/material/TablePagination";

const Pagination = ({
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  count
}) => {
  return (
    <Container sx={{ py: 1 }} maxWidth="xl">
      <TablePagination
        // sx={{ border: 1, borderColor: "red" }}
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={"Rows per page :"}
        rowsPerPageOptions={[30, 50, 100]}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Container>
  );
};

export default Pagination;
