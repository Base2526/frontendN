import {
  UserListContainer,
  UserWrapper,
  EditButton,
  ButtonWrapper
} from "./DblogList.styled";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import moment from "moment";
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
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import _ from "lodash"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useQuery } from "@apollo/client";
import { gqlDblog } from "../../gqlQuery"
import Footer from "../home2/Footer";

const DblogList = (props) => {
  let history = useHistory();

  const [pageOptions, setPageOptions] = useState([50, 100, 200]);  
  const [page, setPage] = useState(0);  
  const [perPage, setPerPage] = useState(pageOptions[0])

  const [openDialogDelete, setOpenDialogDelete] = useState({
    isOpen: false,
    id: ""
  });

  const dblogValues = useQuery(gqlDblog, {
    variables: {page: page, perPage: perPage},
    notifyOnNetworkStatusChange: true,
  });

  console.log("dblogValues :", dblogValues)

  const handleClose = () => {
    // setOpen(false);
    setOpenDialogDelete({ ...openDialogDelete, isOpen: false });
  };

  const handleDelete = (id) => {
    // setUserData(userData.filter((user) => user.id !== id));
  };

  /*
  level: String
    meta: String
    message: String
    timestamp: String
  */

  const columns = [
    {
      field: "level",
      headerName: "Level",
      width: 100
    },
    {
      field: "message",
      headerName: "Message",
      width: 500,
    },
    // {
    //   field: "meta",
    //   headerName: "Meta",
    //   width: 250,
    // },
    {
      field: "timestamp",
      headerName: "Create at",
      width: 200,
      renderCell: (params) => {
        console.log("params.row.timestamp :", params.row.timestamp/1000)
        return  <Typography variant="overline" display="block" gutterBottom>
                  {moment.unix(params.row.timestamp/1000).format('DD/MM/YYYY hh:mm:ss A')}
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
            {/* <Link to={`/role/${params.row.id}/edit`}>
              <button className="editBtn">Edit</button>
            </Link> */}
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
         dblogValues.loading
         ?  <div><CircularProgress /></div> 
         :  <DataGrid
              rows={dblogValues.data.Dblog.data}
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

      
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={(e)=>{
          history.push("/role/new");
        }}
      />

      <Footer />
    </Box>
  );
};

export default DblogList;
