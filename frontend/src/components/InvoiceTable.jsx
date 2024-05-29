import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
const InvoiceTable = () => {
  function createData(
    date,
    reference,
    description,
    state,
    importpayment,
    action
  ) {
    return { date, reference, description, state, importpayment, action };
  }

  const rows = [
    createData(
      "2024-05-18",
      "#2024F7093",
      "Small. From 18/05/2024 to 18/06/2024. Subscription Monthly",
      <span
        className="stateSpan"
        style={{
          background: "#06C15D",
        }}
      >
        <p>Paid</p>
      </span>,
      "$29",
      <Link className="invoicelink">Show Invoice</Link>
    ),

    createData(
      "2024-05-18",
      "#2024F7093",
      "Small. From 18/05/2024 to 18/06/2024. Subscription Monthly",
      <span
        className="stateSpan"
        style={{
          background: "#F93942",
        }}
      >
        <p>Cancelled</p>
      </span>,
      "$29",
      <Link className="invoicelink">Show Invoice</Link>
    ),
    createData(
      "2024-05-18",
      "#2024F7093",
      "Small. From 18/05/2024 to 18/06/2024. Subscription Monthly",
      <span
        className="stateSpan"
        style={{
          background: "#F93942",
        }}
      >
        <p>Pending</p>
      </span>,
      "$29",
      <Link className="invoicelink">Show Invoice</Link>
    ),
  ];
  return (
    <div className="invoiceTable">
      <TableContainer component={Paper} sx={{ border: "0", outline: "none" }}>
        <Table
          sx={{ minWidth: 650, border: "0", outline: "none" }}
          aria-label="simple table"
        >
          <TableHead
            sx={{
              border: "0",
              outline: "none",
            }}
          >
            <TableRow
              className="headingRow"
              sx={{
                border: "0",
                outline: "none",
              }}
            >
              <TableCell className="headingCell">Date</TableCell>
              <TableCell className="headingCell" align="left">
                Reference
              </TableCell>
              <TableCell className="headingCell" align="left">
                Description
              </TableCell>
              <TableCell className="headingCell" align="left">
                State
              </TableCell>
              <TableCell className="headingCell" align="right">
                Import
              </TableCell>
              <TableCell className="headingCell" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="bodyCell">
                  {row.date}
                </TableCell>
                <TableCell align="left" className="bodyCell">
                  {row.reference}
                </TableCell>
                <TableCell align="left" className="bodyCell">
                  {row.description}
                </TableCell>
                <TableCell align="left" className="bodyCell">
                  {row.state}
                </TableCell>
                <TableCell align="right" className="bodyCell">
                  {row.importpayment}
                </TableCell>
                <TableCell align="center" className="bodyCell">
                  {row.action}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InvoiceTable;
