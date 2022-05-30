import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./CommentList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../data";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CommentContext } from "../../Store";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CommentList = (props) => {
  let history = useHistory();
  // const [userData, setUserData] = useState(userRows);
  const [userData, setUserData] = useContext(CommentContext);

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

  /*
    commentId: 12,
    postId: 123,
    message:
  */

  const columns = [
    { field: "id", headerName: "Comment ID", width: 100 },
    {
      field: "postId",
      headerName: "Post Id",
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
      field: "message",
      headerName: "Message",
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
                __html: params.row.message
                // "<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6><p>default body1</p>"
              }}
            >
              {/* {params.row.detail} */}
            </Typography>
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
            <Link to={`/comment/${params.row.id}/edit`}>
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
          history.push("/comment/new");
        }}
        // autoFocus
      >
        Add new comment
      </Button>
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

export default CommentList;
