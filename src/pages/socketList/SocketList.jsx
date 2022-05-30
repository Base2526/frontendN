import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./SocketList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../data";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { SocketContext } from "../../Store";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const SocketList = (props) => {
  let history = useHistory();
  // const [userData, setUserData] = useState(userRows);
  const [userData, setUserData] = useContext(SocketContext);

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

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
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "socketId",
      headerName: "Socket Id",
      width: 170
      // renderCell: (params) => {
      //   return (
      //     <UserWrapper>
      //       <img src={params.row.avatar} alt="" />
      //       {params.row.userName}
      //     </UserWrapper>
      //   );
      // }
    },
    // { field: "email", headerName: "Email", width: 130 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 130
    // },
    // {
    //   field: "transaction",
    //   headerName: "Transaction",
    //   width: 170
    // },
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
      {/* <Button
        variant="contained"
        onClick={() => {
          // newPost
          history.push("/newSocket");
        }}
        // autoFocus
      >
        Add new socket
      </Button> */}
      <DataGrid
        rows={userData}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
        // disableSelectionOnClick
      />
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
    </UserListContainer>
  );
};

export default SocketList;
