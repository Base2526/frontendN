import {
    UserListContainer,
    UserWrapper,
    EditButton,
    ButtonWrapper
} from "./ContactUsList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
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
import LinearProgress from '@mui/material/LinearProgress';

import { useQuery, useMutation } from "@apollo/client";
import {gqlContactUs, gqlPost, gqlUser, gqlTContactUs} from "../../gqlQuery"

import Footer from "../home/Footer";
  
const ContactUsList = (props) => {
    let history = useHistory();
  
    const [pageOptions, setPageOptions] = useState([20, 100]);  
    const [page, setPage] = useState(0);  
    const [perPage, setPerPage] = useState(pageOptions[0])

    const contactUsValues = useQuery(gqlContactUs, {
      variables: {page, perPage},
      notifyOnNetworkStatusChange: true,
    });

    console.log("contactUsValues :", contactUsValues)

    // 
    // const tContactUsListValues = useQuery(gqlTContactUsList, {
    //   variables: {page, perPage},
    //   notifyOnNetworkStatusChange: true,
    // });

    // console.log("tContactUsListValues :", tContactUsListValues)
  
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

    /*
    categoryId: "62a434855359720693aa83fc"
    description: "asdf"
    id: "62a4620f03c1690257de9d8b"
    postId: "62a31ce2ca4789003e5f5123"
    userId: "62a2c0cecf7946010d3c743f"
    */

    const columns = [
      { field: "userId", 
        headerName: "Username", 
        width: 200,
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
      { field: "categoryId", 
        headerName: "Category", 
        width: 200,
        renderCell: (params) => {
          let value = useQuery(gqlTContactUs, {
            variables: {id: params.row.categoryId},
            notifyOnNetworkStatusChange: true,
          });

          return  value.loading 
                  ? <LinearProgress sx={{width:"100px"}} />
                  : <Typography variant="overline" display="block" gutterBottom>
                      {value.data.TContactUs.data.name}
                    </Typography>
        } 
      },
      { field: "postId", 
        headerName: "Post name", 
        width: 200,
        renderCell: (params) => {
          let value = useQuery(gqlPost, {
            variables: {id: params.row.postId},
            notifyOnNetworkStatusChange: true,
          });

          console.log("postId :", value)
          return  value.loading 
                  ? <LinearProgress sx={{width:"100px"}} />
                  : <Typography variant="overline" display="block" gutterBottom>
                      {value.data.Post.data.title}
                    </Typography>
        } 
      },
      { field: "description", headerName: "Description", width: 250 },
      {
        field: "createdAt",
        headerName: "Created At",
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
          contactUsValues.loading
          ?  <div><CircularProgress /></div> 
          :  <DataGrid
              rows={contactUsValues.data.ContactUsList.data}
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
  
  export default ContactUsList;
  