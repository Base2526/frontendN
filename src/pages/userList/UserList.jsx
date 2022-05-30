import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./UserList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../data";
import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../Store";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from "@mui/material/Avatar";
import _ from "lodash"

import { getList } from "../../components/provider/DataProvider";

import Footer from "../home2/Footer";

const UserList = (props) => {
  let history = useHistory();

  // const [userData, setUserData] = useState(userRows);
  const [userData, setUserData] = useContext(UserContext);

  const [datas, setDatas] = useState({data: null, total: 0});

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  useEffect(async()=>{
    setDatas( await getList("users", {}) )
  }, [])

  const handleDelete = (id) => {
    setUserData(userData.filter((user) => user.id !== id));
  };

  const handleClose = () => {
    // setOpen(false);
    setOpenDialogDelete({ ...openDialogDelete, isOpen: false });
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 130,
      renderCell: (params) => {
        console.log("params.row.image :", params.row.image)
        if(params.row.image.length < 1){
          return <Avatar
                  sx={{
                    height: 100,
                    width: 100
                  }}>A</Avatar>
        }
        return (
          <div style={{ position: "relative" }}>
            <Avatar
              sx={{
                height: 100,
                width: 100
              }}
              variant="rounded"
              alt="Example Alt"
              src={params.row.image[0].base64}
            />
          </div>
        );
      }
    },
    { field: "displayName", headerName: "Display name", width: 150 },
    { field: "username", headerName: "User name", width: 150 },
    // {
    //   field: "user",
    //   headerName: "User",
    //   width: 170,
    //   renderCell: (params) => {
    //     return (
    //       <UserWrapper>
    //         <img src={params.row.avatar} alt="" />
    //         {params.row.userName}
    //       </UserWrapper>
    //     );
    //   }
    // },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "lastAccess",
      headerName: "Last access",
      width: 200
    },
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
            <Link to={`/user/${params.row.id}/edit`}>
              <button className="editBtn">Edit</button>
            </Link>
            <DeleteOutline
              className="deleteBtn"
              onClick={() => {
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
      <Button
        variant="contained"
        onClick={() => {
          // newPost
          history.push("/user/new");
        }}
        // autoFocus
      >
        Add new user
      </Button>

      {
         _.isEmpty(datas.data) 
         ?  <div><CircularProgress /></div> 
         :  <DataGrid
              rows={datas.data}
              columns={columns}
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

export default UserList;
