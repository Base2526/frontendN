import {
    UserListContainer,
    UserWrapper,
    EditButton,
    ButtonWrapper
} from "./ContactUsList.styled";
import { useState, useContext, useEffect, useMemo, useRef, useCallback  } from "react";
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
import LinearProgress from '@mui/material/LinearProgress';
import { useQuery } from "@apollo/client";

import {gqlContactUs, gqlPost, gqlUser, gqlTContactUs} from "../../gqlQuery"
import Footer from "../footer";
import Table from "../../TableContainer"
  
const ContactUsList = (props) => {
    let history = useHistory();
  
    const [pageOptions, setPageOptions] = useState([30, 50, 100]);  
    const [pageIndex, setPageIndex] = useState(0);  
    const [pageSize, setPageSize] = useState(pageOptions[0])

    const contactUsValues = useQuery(gqlContactUs, {
      variables: {page: pageIndex, perPage: pageSize},
      notifyOnNetworkStatusChange: true,
    });

    console.log("contactUsValues :", contactUsValues)

  
    const [openDialogDelete, setOpenDialogDelete] = useState({
      isOpen: false,
      id: ""
    });


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
        // 
        {
          Header: 'Username',
          columns: [
            {
              Header: 'Name',
              accessor: 'userId',
              Cell: props =>{
                let value = useQuery(gqlUser, {
                  variables: {id: props.value},
                  notifyOnNetworkStatusChange: true,
                });
      
                return  value.loading 
                        ? <LinearProgress sx={{width:"100px"}} />
                        : <Typography variant="overline" display="block" gutterBottom>
                            {value.data.user.data.displayName}
                          </Typography>
              }
            },
            {
              Header: 'Category name',
              accessor: 'categoryId',
              Cell: props =>{
                let value = useQuery(gqlTContactUs, {
                  variables: {id: props.value},
                  notifyOnNetworkStatusChange: true,
                });

                return  value.loading 
                        ? <LinearProgress sx={{width:"100px"}} />
                        : <Typography variant="overline" display="block" gutterBottom>
                            {value.data.TContactUs.data.name}
                          </Typography>
              } 
            },
            {
              Header: 'Post name',
              accessor: 'postId',
              Cell: props =>{
                  let value = useQuery(gqlPost, {
                    variables: {id:  props.value},
                    notifyOnNetworkStatusChange: true,
                  });

                  console.log("postId :", value)
                  return  value.loading 
                          ? <LinearProgress sx={{width:"100px"}} />
                          : <Typography variant="overline" display="block" gutterBottom>
                              {value.data.post.data.title}
                            </Typography>
              }
            },
            {
              Header: 'Description',
              accessor: 'message',
              Cell: props => <Typography dangerouslySetInnerHTML={{ __html: props.value }} />
            },
            {
              Header: 'Created At',
              accessor: 'createdAt',
            },
            // {
            //   Header: 'Action',
            //   accessor: 'id',
            //   Cell: props => {
            //     console.log("Cell :", props)
            //     return  <div>
            //               <Link to={`/contact-us/${props.value}/edit`}>
            //                 <button>Edit</button>
            //               </Link>
            //               <button>Delete</button>
            //             </div>
            //   }
            // },
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
          contactUsValues.loading
          ?  <div><CircularProgress /></div> 
          :   <Table
                columns={columns}
                data={contactUsValues.data.ContactUsList.data}
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
      </UserListContainer>
    );
  };
  
  export default ContactUsList;
  