import {
    UserListContainer,
    UserWrapper,
    EditButton,
    ButtonWrapper
} from "./ShareList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
import LinearProgress from '@mui/material/LinearProgress';
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";

import {gqlShares, gqlPost, gqlUser} from "../../gqlQuery"
import Footer from "../home2/Footer";

const ShareList = (props) => {
  let history = useHistory();

  const [pageOptions, setPageOptions] = useState([20, 100]);  
  const [page, setPage] = useState(0);  
  const [perPage, setPerPage] = useState(pageOptions[0])

  const shareValues = useQuery(gqlShares, {
    variables: {page, perPage},
    notifyOnNetworkStatusChange: true,
  });

  console.log("shareValues :", shareValues)

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  const handleDelete = (id) => {
    setUserData(userData.filter((user) => user.id !== id));
  };

  const handleClose = () => {
    // setOpen(false);
    setOpenDialogDelete({ ...openDialogDelete, isOpen: false });
  };

  const columns = [
    { 
      field: "userId", 
      headerName: "Username", 
      width: 150,
      renderCell: (params) => {
        let value = useQuery(gqlUser, {
          variables: {id: params.row.userId},
          notifyOnNetworkStatusChange: true,
        });

        return  value.loading 
                ? <LinearProgress sx={{width:"100px"}} />
                : <Typography variant="overline" display="block" gutterBottom>
                    {value.data.User.data.displayName}
                  </Typography>
        
      }
    },
    { 
      field: "postId", 
      headerName: "Post name", 
      width: 400, 
      renderCell: (params) => {
        let postValue = useQuery(gqlPost, {
          variables: {id: params.row.postId},
          notifyOnNetworkStatusChange: true,
        });

        // console.log("postValue : ", params.row.postId, postValue.data.Post.data.title)

        return  postValue.loading 
                ? <LinearProgress sx={{width:"100px"}} />
                : <Typography variant="overline" display="block" gutterBottom>
                    {postValue.data.Post.data.title}
                  </Typography>
        
      }
    },
    { 
      field: "destination", 
      headerName: "Destination", 
      width: 100, 
      renderCell: (params) => {
        return  <Typography>
                  {params.row.destination}
                </Typography>
      }
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
                setOpenDialogDelete({ isOpen: true, id: params.row.id });
              }}
            />
          </ButtonWrapper>
        );
      }
    }
  ];

  return (
    <Box style={{
      flex: 4
    }}>
      {
        shareValues.loading
        ?  <div><CircularProgress /></div> 
        :  <DataGrid
            rows={shareValues.data.Shares.data}
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
    </Box>
  );
};

export default ShareList;
  