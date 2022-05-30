import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./PostList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../data";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext, PostContext } from "../../Store";
import Box from "@mui/material/Box";

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
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import _ from "lodash"
import Avatar from "@mui/material/Avatar";
import ShowMoreText from "react-show-more-text";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { getList } from "../../components/provider/DataProvider";

import Footer from "../home2/Footer";

const PostList = (props) => {
  let history = useHistory();
  // const [userData, setUserData] = useState(userRows);
  const [userData, setUserData] = useContext(PostContext);

  console.log("userData : ", userData);
  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  const [datas, setDatas] = useState({data: null, total: 0});

  useEffect(async()=>{

    setDatas(await getList("posts", {}))

    // let {data, total} = await getList("posts", {})

    // console.log("data, total :", data, total)
    // console.log("userDatauserDatauserDatauserData ", userData)

    console.log("useEffect")
  },[])

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
      field: "body",
      headerName: "Detail",
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
            {/* <Typography
              variant="body1"
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: params.row.body
              }}
            /> */}
            <ShowMoreText
              lines={2}
              more={<ExpandMore />}
              less={""}
              className="show-more-text"
              anchorClass="my-anchor-css-class"
              width={150}
              truncatedEndingComponent={"..."}
            >
              {params.row.body}
            </ShowMoreText>
          </Box>
        );
      }
    },
    {
      field: 'col1',
      headerName: 'Comments',
      width: 150,
      disableClickEventBubbling: false,
      renderCell: (params) => {
        return <ButtonWrapper><Link to={`/comments`}>
        <button className="editBtn">Comment +100</button>
      </Link></ButtonWrapper>
        
      }
    },
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
    <UserListContainer>
      <Button
        variant="contained"
        onClick={() => {
          // newPost
          history.push("/post/new");
        }}
        // autoFocus
      >
        Add new post
      </Button>

        {
         
           _.isEmpty(datas.data) 
           ?  <div><CircularProgress /></div> 
           :  <DataGrid
                rows={datas.data}
                columns={columns}
                // rowsPerPageOptions={[5, 10, 20]}
                // pageSize={5}
                // rowsPerPageOptions={[5]}
                // checkboxSelection
                // disableSelectionOnClick
                rowHeight={80}
              />

        }

     

{/*      
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

       */}
      <Footer />
    </UserListContainer>
  );
};

export default PostList;
