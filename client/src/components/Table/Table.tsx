/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { createTheme, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAgendaContext from "../../contexts/GetAgendaContext";
import BasicModal from "../Modal/Modal";
import AlertDialogSlide from "../Dialog/Dialog";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const newTheme = createTheme({
  palette: {
    primary: {
      main: "#af7c4dc0",
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: newTheme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [nameEvent, setNameEvent] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dateEvent, setDateEvent] = React.useState("");
  const [hourEvent, setHourEvent] = React.useState("");

  const { agendaData } = React.useContext(GetAgendaContext);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - agendaData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const [id, setId] = React.useState("");
  const [idDialog, setIdDialog] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ensaio</StyledTableCell>
              <StyledTableCell align="right">Data</StyledTableCell>
              <StyledTableCell align="right">Horário</StyledTableCell>
              <StyledTableCell align="right">Editar</StyledTableCell>
              <StyledTableCell align="right">Deletar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? agendaData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : agendaData
            ).map((row) => (
              <TableRow key={row.nameEvent}>
                <TableCell component="th" scope="row" sx={{ width: 1500 }}>
                  {row.nameEvent}
                </TableCell>
                <TableCell
                  style={{ width: 300 }}
                  align="right"
                  sx={{ width: 100 }}
                >
                  {row.dateEvent}
                </TableCell>
                <TableCell
                  style={{ width: 200 }}
                  align="right"
                  sx={{ width: 100 }}
                >
                  {row.hourEvent}
                </TableCell>
                <TableCell
                  style={{ width: 200 }}
                  align="right"
                  sx={{ width: 100 }}
                >
                  <VisibilityIcon
                    onClick={() => {
                      handleOpen();
                      setNameEvent(row.nameEvent);
                      setDescription(row.description);
                      setDateEvent(row.dateEvent);
                      setHourEvent(row.hourEvent);
                      setId(row._id);
                    }}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
                <TableCell
                  style={{ width: 200 }}
                  align="right"
                  sx={{ width: 100 }}
                >
                  <DeleteIcon
                    onClick={() => {
                      handleClickOpen();
                      setIdDialog(row._id);
                    }}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={agendaData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <AlertDialogSlide
        open={openDialog}
        funcClose={handleClickClose}
        id={idDialog}
      />
      <BasicModal
        open={open}
        funcClose={handleClose}
        name={nameEvent}
        description={description}
        date={dateEvent}
        hour={hourEvent}
        setName={setNameEvent}
        setDescription={setDescription}
        setDate={setDateEvent}
        setHour={setHourEvent}
        id={id}
      />
    </>
  );
}
