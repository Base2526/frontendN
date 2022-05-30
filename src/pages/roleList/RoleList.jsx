import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./RoleList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../data";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { RoleContext } from "../../Store";

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
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import _ from "lodash"

import { getList } from "../../components/provider/DataProvider";
import Footer from "../home2/Footer";

const RoleList = (props) => {
  let history = useHistory();
  // const [userData, setUserData] = useState(userRows);
  const [userData, setUserData] = useContext(RoleContext);

  const [datas, setDatas] = useState({data: null, total: 0});

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  useEffect(async()=>{
    setDatas( await getList("roles", {}) )
  }, [])

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
    // { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
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
    {
      field: "description",
      headerName: "Description",
      width: 250,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              maxHeight: "inherit",
              width: "100%",
              whiteSpace: "initial",
              lineHeight: "16px"
            }}
          >
            <Typography
              variant="body1"
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: params.row.description
              }}
            />
            {/* <ShowMoreText
              lines={2}
              more={<ExpandMore />}
              less={""}
              className="show-more-text"
              anchorClass="my-anchor-css-class"
              width={150}
              truncatedEndingComponent={"..."}
            >
              {params.row.description}
            </ShowMoreText> */}
          </Box>
        );
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <ButtonWrapper>
            <Link to={`/role/${params.row.id}/edit`}>
              <button className="editBtn">Edit</button>
            </Link>
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
      <Button
        variant="contained"
        onClick={() => {
          // newPost
          history.push("/role/new");
        }}
        // autoFocus
      >
        Add new role
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

export default RoleList;
