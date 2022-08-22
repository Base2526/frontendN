import { ButtonWrapper } from "./PostList.styled";
import { Link } from "react-router-dom";
import { useState, useCallback, useEffect, useMemo, useRef  } from "react";
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
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import LinearProgress from '@mui/material/LinearProgress';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { connect } from "react-redux";

import Footer from "../footer";
import {gqlPosts, gqlBookmarksByPostId, gqlShareByPostId, gqlComment, gqlUser} from "../../gqlQuery"
import ReadMoreMaster from "../../utils/ReadMoreMaster"
import Table from "../../TableContainer"

const PostList = (props) => {
  let history = useHistory();

  let { user } = props

  const [pageOptions, setPageOptions] = useState([30, 50, 100]);  
  const [pageIndex, setPageIndex] = useState(0);  
  const [pageSize, setPageSize] = useState(pageOptions[0])
  const [lightbox, setLightbox] = useState({ isOpen: false, photoIndex: 0, images: [] });
  const [openDialogDelete, setOpenDialogDelete] = useState({ isOpen: false, id: "" });

  const postsValue = useQuery(gqlPosts, {
    variables: {userId: _.isEmpty(user) ? "" : user.id, page: pageIndex, perPage: pageSize},
    notifyOnNetworkStatusChange: true,
  });

  console.log("postsValue :", postsValue)

  ///////////////
  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
    console.log("fetchData is being called #1")

    setPageSize(pageSize)
    setPageIndex(pageIndex)
  })
  ///////////////


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

  ///////////////////////
  const columns = useMemo(
    () => [
      // 
      {
        Header: 'Username',
        accessor: 'id',
        columns: [
          {
            Header: 'Profile',
            accessor: 'files',
            Cell: props =>{
              if(props.value.length < 1){
                return <div />
              }

              console.log("files :", props.value)
              return (
                <div style={{ position: "relative" }}>
                  <CardActionArea style={{ position: "relative", paddingBottom: "10px" }}>
                    <Avatar
                      sx={{
                        height: 100,
                        width: 100
                      }}
                      variant="rounded"
                      alt="Example Alt"
                      src={props.value[0].url}
                      onClick={(e) => {
                        console.log("files props: ", props.value)
                        setLightbox({ isOpen: true, photoIndex: 0, images:props.value })
                      }}
                    />
                  </CardActionArea>
                  <div
                      style={{
                          position: "absolute",
                          bottom: "5px",
                          right: "5px",
                          padding: "5px",
                          backgroundColor: "#e1dede",
                          color: "#919191"
                      }}
                      >{props.value.length}</div>
                </div>
              );
            }
          },
          {
            Header: 'Title',
            accessor: 'title',
            Cell: props =>{
              return <Link to={`/detail/${props.row.original.id}`}>{props.value}</Link>
            }
          }, 
          {
            Header: 'Detail',
            accessor: 'description',
            Cell: props => {
              return <Box
                      sx={{
                        maxHeight: "inherit",
                        width: "100%",
                        whiteSpace: "initial",
                        lineHeight: "16px"
                      }}>
                      <ReadMoreMaster
                        byWords={true}
                        length={10}
                        ellipsis="...">{props.value}
                      </ReadMoreMaster>
                    </Box>
            }
          },
          // {
          //   Header: 'Owner',
          //   accessor: 'ownerId',
          //   Cell: props =>{
          //     let userValue = useQuery(gqlUser, {
          //       variables: {id: props.value},
          //       notifyOnNetworkStatusChange: true,
          //     });
      
          //     return userValue.loading 
          //           ? <LinearProgress sx={{width:"100px"}} />
          //           : userValue.data.user.data != null ? <Link to={`/user/${userValue.data.user.data.id}/view`}>{userValue.data.user.data.displayName}</Link> : <div />
          //   } 
          // },
          {
            Header: 'Comments',
            Cell: props =>{
              let commentValues = useQuery(gqlComment, {
                variables: {postId: props.row.original.id},
                notifyOnNetworkStatusChange: true,
              });
              if(!commentValues.loading){
                if( commentValues.data === undefined || commentValues.data.comment.data.length == 0){
                  return <div />
                }
          
                let count = 0;
                _.map(commentValues.data.comment.data, (v) => {
                  if (v.replies) {
                    count += v.replies.length;
                  }
                });
          
                return  <ButtonWrapper>
                          <Link to={`/comments`}>
                            <button className="editBtn">{commentValues.data.comment.data.length + count}</button>
                          </Link>
                        </ButtonWrapper>
              }
              return <div />
            } 
          },
          {
            Header: 'Bookmark',
            Cell: props =>{
              const bmValus = useQuery(gqlBookmarksByPostId, {
                variables: { postId: props.row.original.id},
                notifyOnNetworkStatusChange: true, 
              });
      
              if( bmValus.data === undefined ){
                return <div />
              }
      
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
            Header: 'Share',
            Cell: props =>{
              const shareValus = useQuery(gqlShareByPostId, {
                variables: {postId: props.row.original.id},
                notifyOnNetworkStatusChange: true,
              });

              if( shareValus.data === undefined ){
                return <div />
              }
      
              return  shareValus.loading 
                      ? <LinearProgress sx={{width:"100px"}} />
                      : shareValus.data.shareByPostId.data.length == 0 
                          ? <div /> 
                          : <ButtonWrapper><Link to={`/comments`}>
                              <button className="editBtn">{shareValus.data.shareByPostId.data.length}</button>
                            </Link></ButtonWrapper>
            } 
          },
          {
            Header: 'Action',
            Cell: props => {

              console.log("action :", props.row.original)
              return  <div>
                        <Link to={`/post/${props.row.original._id}/edit`}>
                          <button>Edit</button>
                        </Link>
                        <button>Delete</button>
                      </div>
            }
          },
        ],
      }
    ],
    []
  )

  // const [data, setData] = useState(() => makeData(10000))
  // const [originalData] = useState(data)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false)

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    console.log("updateMyData")
    // We also turn on the flag to not reset the page
    skipResetRef.current = true
    // setData(old =>
    //   old.map((row, index) => {
    //     if (index === rowIndex) {
    //       return {
    //         ...row,
    //         [columnId]: value,
    //       }
    //     }
    //     return row
    //   })
    // )
  }

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  // useEffect(() => {
  //   skipResetRef.current = false

  //   console.log("data :", data)
  // }, [data])
  //////////////////////

  return (
    <Box style={{ flex: 4 }}>
      {
        postsValue.loading
        ? <div><CircularProgress /></div> 
        : <Table
            columns={columns}
            data={postsValue.data.posts.data}
            fetchData={fetchData}
            rowsPerPage={pageOptions}
            updateMyData={updateMyData}
            skipReset={skipResetRef.current}
            isDebug={false}
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

      {lightbox.isOpen && (
        <Lightbox
          mainSrc={lightbox.images[lightbox.photoIndex].base64}
          nextSrc={lightbox.images[(lightbox.photoIndex + 1) % lightbox.images.length].base64}
          prevSrc={
            lightbox.images[(lightbox.photoIndex + lightbox.images.length - 1) % lightbox.images.length].base64
          }
          onCloseRequest={() => {
            setLightbox({ ...lightbox, isOpen: false });
          }}
          onMovePrevRequest={() => {
            setLightbox({
              ...lightbox,
              photoIndex:
                (lightbox.photoIndex + lightbox.images.length - 1) % lightbox.images.length
            });
          }}
          onMoveNextRequest={() => {
            setLightbox({
              ...lightbox,
              photoIndex: (lightbox.photoIndex + 1) % lightbox.images.length
            });
          }}
        />
      )}

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}>
        {
          _.map([
                  { icon: <PostAddIcon />, name: 'Post', id: 1 },
                  // { icon: <AddIcCallIcon />, name: 'Phone', id: 2 },
                ], (action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    onClick={(e)=>{
                      switch(action.id){
                        case 1:{
                          history.push({ pathname: "/post/new", state: {from: "/"} });
                          break;
                        }

                        // case 2:{
                        //   history.push({ pathname: "/phone/new", state: {from: "/"} });
                        //   break;
                        // }
                      }
                    }}
                  />
                ))
        }
      </SpeedDial>
      
      <Footer />
    </Box>
  );
};

// export default PostList;
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
  }
};

export default connect( mapStateToProps, null )(PostList);
