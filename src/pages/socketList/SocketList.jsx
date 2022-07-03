import {
  UserListContainer,
  ButtonWrapper
} from "./SocketList.styled";
import { useState, useContext, useEffect, useMemo, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import _ from "lodash"
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";

import {gqlSockets} from "../../gqlQuery"
import Footer from "../footer";
import Table from "../../TableContainer"

const SocketList = (props) => {
  let history = useHistory();
 
  const [pageOptions, setPageOptions] = useState([30, 50, 100]);  
  const [pageIndex, setPageIndex] = useState(0);  
  const [pageSize, setPageSize] = useState(pageOptions[0])

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  const socketsValue = useQuery(gqlSockets, {
    variables: {page: pageIndex, perPage: pageSize},
    notifyOnNetworkStatusChange: true,
  });

  console.log("socketsValue :", socketsValue)

  ///////////////
  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
    console.log("fetchData is being called #1")

    setPageSize(pageSize)
    setPageIndex(pageIndex)
  })
  ///////////////

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

  ///////////////////////
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'socketId',
            accessor: 'Socket Id',
          },
          {
            Header: 'Description',
            accessor: 'description',
            Cell: props => {

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
                      __html: props.row.original.description
                    }}
                  />
                </Box>
              );
            }
          }
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
    <Box style={{
      flex: 4
    }}>
      {
         socketsValue.loading
         ?  <div><CircularProgress /></div> 
         :  <Table
              columns={columns}
              data={ socketsValue.data.Sockets.data }
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
      <Footer />
    </Box>
  );
};

export default SocketList;
