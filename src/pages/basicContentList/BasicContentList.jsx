import "./BasicContentList.css";
import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./BasicContentList.styled";

import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect, useMemo, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from "@mui/material/Avatar";
import _ from "lodash"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useQuery } from "@apollo/client";


import {gqlBasicContents} from "../../gqlQuery"
import Footer from "../footer";
import Table from "../../TableContainer"

const BasicContentList = (props) => {
  let history = useHistory();

  const [pageOptions, setPageOptions] = useState([30, 50, 100]);  
  const [pageIndex, setPageIndex] = useState(0);  
  const [pageSize, setPageSize] = useState(pageOptions[0])

  //////////////////////

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  const basicContentsValues = useQuery(gqlBasicContents, {
    variables: {page: pageIndex, perPage: pageSize},
    notifyOnNetworkStatusChange: true,
  });

  console.log("basicContentsValues :", basicContentsValues)

  ///////////////
  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
    console.log("fetchData is being called #1")

    setPageSize(pageSize)
    setPageIndex(pageIndex)
  })
  ///////////////


  ///////////////////////

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            // aggregate: 'count',
            // Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: 'Description',
            accessor: 'description',
            // Use our custom `fuzzyText` filter on this column
            // filter: 'fuzzyText',
            // // Use another two-stage aggregator here to
            // // first count the UNIQUE values from the rows
            // // being aggregated, then sum those counts if
            // // they are aggregated further
            // aggregate: 'uniqueCount',
            // Aggregated: ({ value }) => `${value} Unique Names`,
            Cell: props => <Typography dangerouslySetInnerHTML={{ __html: props.value }} />
          },
          {
            Header: 'Action',
            accessor: 'id',
            // Use our custom `fuzzyText` filter on this column
            // filter: 'fuzzyText',
            // // Use another two-stage aggregator here to
            // // first count the UNIQUE values from the rows
            // // being aggregated, then sum those counts if
            // // they are aggregated further
            // aggregate: 'uniqueCount',
            // Aggregated: ({ value }) => `${value} Unique Names`,
            Cell: props => {
              console.log("Cell :", props)
              return  <div>
                        <Link to={`/basic-content/${props.value}/edit`}>
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

  // const columns = [
  //   // { field: "id", headerName: "ID", width: 100 },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     width: 170
  //     // renderCell: (params) => {
  //     //   return (
  //     //     <UserWrapper>
  //     //       <img src={params.row.avatar} alt="" />
  //     //       {params.row.userName}
  //     //     </UserWrapper>
  //     //   );
  //     // }
  //   },
  //   {
  //     field: "description",
  //     headerName: "Description",
  //     width: 250,
  //     renderCell: (params) => {
  //       return (
  //         <Box
  //           sx={{
  //             maxHeight: "inherit",
  //             width: "100%",
  //             whiteSpace: "initial",
  //             lineHeight: "16px"
  //           }}
  //         >
  //           <Typography
  //             variant="body1"
  //             gutterBottom
  //             dangerouslySetInnerHTML={{
  //               __html: params.row.description
  //             }}
  //           >
  //           </Typography>
  //         </Box>
  //       );
  //     }
  //   },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 140,
  //     renderCell: (params) => {
  //       return (
  //         <ButtonWrapper>
  //           <Link to={`/bank/${params.row.id}/edit`}>
  //             <button className="editBtn">Edit</button>
  //           </Link>
  //           <DeleteOutline
  //             className="deleteBtn"
  //             onClick={() => {
  //               // handleDelete(params.row.id);
  //               // setOpen(true);
  //               setOpenDialogDelete({ isOpen: true, id: params.row.id });
  //             }}
  //           />
  //         </ButtonWrapper>
  //       );
  //     }
  //   }
  // ];

  return (
    <UserListContainer>
      {
        //  bankValues.loading
        //  ?  <div><CircularProgress /></div> 
        //  :  <DataGrid
        //       rows={bankValues.data.Banks.data}
        //       columns={columns}
        //       rowHeight={80}

        //       pageSize={perPage}
        //       onPageSizeChange={(newPerPage) => {
        //         setPerPage(newPerPage)
        //         setPage(0)
        //       }}
        //       rowsPerPageOptions={pageOptions}
        //       page={page}
        //       onPageChange={(newPage) =>{
        //         setPage(newPage)
        //       }}
        //     />

        
      }

      {/* Table */}
      {
        basicContentsValues.loading
        ? <div><CircularProgress /></div> 
        : <Table
            columns={columns}
            data={basicContentsValues.data.basicContents.data}
            fetchData={fetchData}
            rowsPerPage={pageOptions}
            updateMyData={updateMyData}
            skipReset={skipResetRef.current}
            isDebug={false}
          />
      }
      
      {/* Table */}

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
          history.push("/basic-content/new");
        }}
      />
      <Footer />
    </UserListContainer>
  );
};

export default BasicContentList;
