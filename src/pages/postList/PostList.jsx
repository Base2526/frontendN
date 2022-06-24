import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./PostList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext, PostContext } from "../../Store";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import _ from "lodash"
import Avatar from "@mui/material/Avatar";
import ShowMoreText from "react-show-more-text";
import ExpandMore from "@material-ui/icons/ExpandMore";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import LinearProgress from '@mui/material/LinearProgress';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Footer from "../home/Footer";
import {gqlPosts, gqlBookmarksByPostId, gqlShareByPostId, gqlComment, gqlUser} from "../../gqlQuery"

import ReadMoreMaster from "../../utils/ReadMoreMaster"

const PostList = (props) => {
  let history = useHistory();

  let userId = "62a31ce2ca4789003e5f5123";

  const [pageOptions, setPageOptions] = useState([5, 10, 20]);  
  const [page, setPage] = useState(0);  
  const [perPage, setPerPage] = useState(pageOptions[0])
  
  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  const { error, data, loading, networkStatus } = useQuery(gqlPosts, {
    variables: {page: page, perPage: perPage},
    notifyOnNetworkStatusChange: true,
  });

  console.log("error, data, loading, networkStatus, gqlPosts :", error, data, loading, networkStatus)

  const handleClickOpen = () => {
    setOpenDialogDelete({ ...openDialogDelete, isOpen: true });
  };

  const handleClose = () => {
    // setOpen(false);
    setOpenDialogDelete({ ...openDialogDelete, isOpen: false });
  };

  const handleDelete = (id) => {
    // setUserData(userData.filter((user) => user.id !== id));
  };

  const columns = [
    {
      field: "files",
      headerName: "Image",
      width: 130,
      renderCell: (params) => {

        if(params.row.files.length < 1){
          return <div />
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
              src={params.row.files[0].base64}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    padding: "5px",
                    backgroundColor: "#e1dede",
                    color: "#919191"
                }}
                >{params.row.files.length}</div>
          </div>
        );
      }
    },
    {
      field: "title",
      headerName: "Title",
      width: 150
    },
    {
      field: "body",
      headerName: "Detail",
      width: 200,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              maxHeight: "inherit",
              width: "100%",
              whiteSpace: "initial",
              lineHeight: "16px"
            }}>
            <ReadMoreMaster
              byWords={true}
              length={10}
              ellipsis="...">{params.row.description}</ReadMoreMaster>
          </Box>
        );
      }
    },
    {
      field: 'ownerId',
      headerName: 'Owner',
      width: 150,
      disableClickEventBubbling: false,
      renderCell: (params) => {
        

        let userValue = useQuery(gqlUser, {
          variables: {id: params.row.ownerId},
          notifyOnNetworkStatusChange: true,
        });

        // console.log("Owner Id :", userValue )

        // /user/62a2c0cecf7946010d3c743f/view
        return userValue.loading 
              ? <LinearProgress sx={{width:"100px"}} />
              : userValue != null ? <Link to={`/user/${userValue.data.User.data.id}/view`}>{userValue.data.User.data.displayName}</Link> : <></>
      }
    },
    {
      field: 'comments',
      headerName: 'Comments',
      width: 150,
      disableClickEventBubbling: false,
      renderCell: (params) => {
     
        let commentValues = useQuery(gqlComment, {
          variables: {postId: params.row.id},
          notifyOnNetworkStatusChange: true,
        });
    
        if(!commentValues.loading){
          if(commentValues.data.Comment.data.length == 0){
            return <div />
          }
    
          let count = 0;
          _.map(commentValues.data.Comment.data, (v) => {
            if (v.replies) {
              count += v.replies.length;
            }
          });
    
          return  <ButtonWrapper><Link to={`/comments`}>
                    <button className="editBtn">{commentValues.data.Comment.data.length + count}</button>
                  </Link></ButtonWrapper>
        }
        return <div />
      }
    },
    {
      field: "bookmark",
      headerName: "Bookmark",
      width: 120,
      renderCell: (params) => {
        const bmValus = useQuery(gqlBookmarksByPostId, {
          variables: { postId: params.row.id },
          notifyOnNetworkStatusChange: true,
        });

        // console.log("gqlBookmarksByPostId : ", bmValus)

        return  bmValus.loading 
                ? <LinearProgress sx={{width:"100px"}} />
                : bmValus.data.bookmarksByPostId.data.length == 0 
                    ? <div /> 
                    : <ButtonWrapper><Link to={`/comments`}>
                        <button className="editBtn">{bmValus.data.bookmarksByPostId.data.length}</button>
                      </Link></ButtonWrapper>
        
      }
    },
    {
      field: "share",
      headerName: "Share",
      width: 120,
      renderCell: (params) => {
        // console.log("share : ", params)

        const shareValus = useQuery(gqlShareByPostId, {
          variables: {postId: params.row.id, page: 0, perPage: 10000},
          notifyOnNetworkStatusChange: true,
        });

        return  shareValus.loading 
                ? <LinearProgress sx={{width:"100px"}} />
                : shareValus.data.ShareByPostId.data.length == 0 
                    ? <div /> 
                    : <ButtonWrapper><Link to={`/comments`}>
                        <button className="editBtn">{shareValus.data.ShareByPostId.data.length}</button>
                      </Link></ButtonWrapper>
        
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <ButtonWrapper>
            <Link to={`/post/${params.row.id}/edit`}>
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
    <Box style={{
      flex: 4
    }}>
        {
          loading
          ? <div><CircularProgress /></div> 
          : <DataGrid
              rows={data.Posts.data}
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
              rowCount={data.Posts.total}
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

       

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={(e)=>{
            history.push("/post/new");
          }}
        >
         
        </SpeedDial>
      <Footer />
    </Box>
  );
};

export default PostList;
