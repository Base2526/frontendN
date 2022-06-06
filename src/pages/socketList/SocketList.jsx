import {
  UserListContainer,
  ButtonWrapper
} from "./SocketList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from "@mui/material/Avatar";
import _ from "lodash"

import { useQuery } from "@apollo/client";

import {gqlSockets} from "../../gqlQuery"
import Footer from "../home2/Footer";

const SocketList = (props) => {
  let history = useHistory();
 
  const [pageOptions, setPageOptions] = useState([20, 100]);  
  const [page, setPage] = useState(0);  
  const [perPage, setPerPage] = useState(pageOptions[0])

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  const { error, data, loading, networkStatus } = useQuery(gqlSockets, {
    variables: {page: page, perPage: perPage},
    notifyOnNetworkStatusChange: true,
  });

  console.log("error, data, loading, networkStatus :", error, data, loading, networkStatus)

  const handleClickOpen = () => {
    // setOpen(true);

    setOpenDialogDelete({ ...openDialogDelete, isOpen: true });
  };

  const handleClose = () => {
    // setOpen(false);
    setOpenDialogDelete({ ...openDialogDelete, isOpen: false });
  };

  const handleDelete = (id) => {
    setUserData(userData.filter((user) => user.id !== id));
  };

  const columns = [
    {
      field: "socketId",
      headerName: "Socket Id",
      width: 170
    },
    {
      field: "description",
      headerName: "Description",
      width: 170
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <ButtonWrapper>
            <DeleteOutline
              className="deleteBtn"
              onClick={() => {
                // handleDelete(params.row.id);
                // setOpen(true);
                setOpenDialogDelete({ isOpen: true, id: params.row.id });
              }}
            />
          </ButtonWrapper>
        );
      }
    }
  ];

  return (
    <UserListContainer>
      

      {
         loading
         ?  <div><CircularProgress /></div> 
         :  <DataGrid
              rows={data.Sockets.data}
              columns={columns}
              rowHeight={80}

              pageSize={perPage}
              onPageSizeChange={(newPerPage) => {
                setPerPage(newPerPage)
                setPage(0)
              }}
              rowsPerPageOptions={pageOptions}
              page={page}
              onPageChange={(newPage) =>{
                setPage(newPage)
              }}
            />
      }

      {openDialogDelete.isOpen && (
        <Dialog
          open={openDialogDelete.isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Delete
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                handleDelete(openDialogDelete.id);

                setOpenDialogDelete({ isOpen: false, id: "" });
              }}
            >
              Delete
            </Button>
            <Button variant="contained" onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Footer />
    </UserListContainer>
  );
};

export default SocketList;
