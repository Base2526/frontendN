import {
    UserListContainer,
    UserWrapper,
    EditButton,
    ButtonWrapper
  } from "./TContactUsList.styled";

import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
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

import {gqlTContactUsList} from "../../../gqlQuery"
import Footer from "../../home/Footer";
  
const TContactUsList = (props) => {
    let history = useHistory();

    const [pageOptions, setPageOptions] = useState([20, 100]);  
    const [page, setPage] = useState(0);  
    const [perPage, setPerPage] = useState(pageOptions[0])

    const [openDialogDelete, setOpenDialogDelete] = useState({
        isOpen: false,
        id: ""
    });

    const tContactUsValues = useQuery(gqlTContactUsList, {
        variables: {page: page, perPage: perPage},
        notifyOnNetworkStatusChange: true,
    });

    console.log("tContactUsValues :", tContactUsValues)

    /*
    
    */

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
            field: "name",
            headerName: "Name",
            width: 170
        },
        {
        field: "description",
        headerName: "Description",
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
                <Typography
                variant="body1"
                gutterBottom
                dangerouslySetInnerHTML={{
                    __html: params.row.description
                }}
                >
                </Typography>
            </Box>
            );
        }
        },
        {
        field: "action",
        headerName: "Action",
        width: 140,
        renderCell: (params) => {
            return (
            <ButtonWrapper>
                <Link to={`/tcontactus/${params.row.id}/edit`}>
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

            {
                tContactUsValues.loading
                ?  <div><CircularProgress /></div> 
                :  <DataGrid
                    rows={tContactUsValues.data.TContactUsList.data}
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
                    history.push("/tcontactus/new");
                }}
            />

            <Footer />
        </UserListContainer>
    );
};

export default TContactUsList;