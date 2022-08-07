import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./UserList.styled";
import { useState, useContext, useEffect, useMemo, useRef, useCallback } from "react";
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

import {gqlUsers, gqlPostsByUser} from "../../gqlQuery"
import Footer from "../footer";
import Table from "../../TableContainer"

const UserList = (props) => {
  let history = useHistory();

  const [pageOptions, setPageOptions] = useState([30, 50, 100]);  
  const [pageIndex, setPageIndex] = useState(0);  
  const [pageSize, setPageSize] = useState(pageOptions[0])

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  const usersValue = useQuery(gqlUsers, {
    variables: {page: pageIndex, perPage: pageSize},
    notifyOnNetworkStatusChange: true,
  });

  console.log("usersValue :", usersValue)

  ///////////////
  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
    console.log("fetchData is being called #1")

    setPageSize(pageSize)
    setPageIndex(pageIndex)
  })
  ///////////////

  const handleDelete = (id) => {
    setUserData(userData.filter((user) => user.id !== id));
  };

  const handleClose = () => {
    // setOpen(false);
    setOpenDialogDelete({ ...openDialogDelete, isOpen: false });
  };

  ///////////////////////
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Image',
            accessor: 'image',
            Cell: props =>{
              if(props.row.original.image.length < 1){
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
                    src={props.row.original.image[0].base64}
                  />
                </div>
              );
            }
          },
          {
            Header: 'Display name',
            accessor: 'displayName',
            Cell: props => {
              return  <Link to={`/user/${props.row.original.id}/view`}>
                        {props.row.original.displayName}
                      </Link>
            }
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Posts',
            accessor: 'posts',
            Cell: props => {
              const postsByUser = useQuery(gqlPostsByUser, {
                variables: { userId: props.row.original.id },
                notifyOnNetworkStatusChange: true,
              });

              return postsByUser.loading
                    ? <LinearProgress sx={{width:"100px"}} />
                    : <>{postsByUser.data.postsByUser.data.length }</>  
            }
          },
          {
            Header: 'Last access',
            accessor: 'lastAccess',
          },
          {
            Header: 'Action',
            Cell: props => {
              console.log("Cell :", props)
              return  <div>
                        <Link to={`/user/${props.row.original.id}/edit`}>
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
    <UserListContainer>
      {
        usersValue.loading
        ? <div><CircularProgress /></div> 
        : <Table
            columns={columns}
            data={usersValue.data.users.data}
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
