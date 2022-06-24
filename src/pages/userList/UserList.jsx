import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./UserList.styled";
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
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useQuery } from "@apollo/client";
import LinearProgress from '@mui/material/LinearProgress';

import {gqlUsers, gqlManyRoles, gqlPostsByOwner} from "../../gqlQuery"

import Footer from "../home/Footer";

const UserList = (props) => {
  let history = useHistory();

  // const [userData, setUserData] = useState(userRows);
  // const [userData, setUserData] = useContext(UserContext);

  // const [datas, setDatas] = useState({data: null, total: 0});

  const [pageOptions, setPageOptions] = useState([5, 10, 20]);  
  const [page, setPage] = useState(0);  
  const [perPage, setPerPage] = useState(pageOptions[0])

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  const { error, data, loading, networkStatus } = useQuery(gqlUsers, {
    variables: {page: page, perPage: perPage},
    notifyOnNetworkStatusChange: true,
  });

  console.log("error, data, loading, networkStatus :", error, data, loading, networkStatus)

  // const { dataDemo } = useDemoData({
  //   rowLength: 100
  // });

  // useEffect(async()=>{
  //   setDatas( await getList("users", {}) )
  // }, [])

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
    { field: "displayName", 
      headerName: "Display name", 
      width: 150, 
      renderCell: (params) =>{

        return  <Link to={`/user/${params.row.id}/view`}>
                  {params.row.displayName}
                </Link>
      }
    },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "posts",
      headerName: "Posts",
      width: 120,
      renderCell: (params) => {
        const postsByOwner = useQuery(gqlPostsByOwner, {
          variables: { ownerId: params.row.id },
          notifyOnNetworkStatusChange: true,
        });

        return postsByOwner.loading
              ? <LinearProgress sx={{width:"100px"}} />
              : <>{postsByOwner.data.postsByOwner.data.length }</>        
      }
    },
    /*
    { field: "username", headerName: "User name", width: 150 },
    { 
      field: "roles", 
      headerName: "Roles", 
      width: 150,
      renderCell: (params) => {
        let values = useQuery(gqlManyRoles, {
          variables: { ids: params.row.roles },
          notifyOnNetworkStatusChange: true,
        });

        return  values.loading 
                ? <LinearProgress sx={{width:"100px"}} />
                : <div>
                  {
                    _.map(values.data.getManyRoles.data, (v)=>{
                      return  <Typography variant="overline" display="block" gutterBottom>
                              {v.name}
                            </Typography>
                    })
                  }
                </div>
        
      }
    },
  */
    {
      field: "lastAccess",
      headerName: "Last access",
      width: 200
    },
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
      {
        loading
        ? <div><CircularProgress /></div> 
        : <DataGrid
            rows={data.Users.data}
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
            rowCount={data.Users.total}
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
          history.push("/user/new");
        }}
      />
      <Footer />
    </UserListContainer>
  );
};

export default UserList;
