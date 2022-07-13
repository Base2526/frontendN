import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import {
  NewUserContainer,
  NewUserForm,
  FormItem,
  GenderContainer,
  NewUserButton,
  ButtonWrapper
} from "./User.styled";
import LinearProgress from '@mui/material/LinearProgress';
import { useQuery, useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import ReadMoreMaster from "../../utils/ReadMoreMaster"
import Table from "../../TableContainer"
import { gqlCreateAndUpdateBookmark, gqlUser} from "../../gqlQuery"

const UserEditPanelFollower = ({followers}) => {

    const [onCreateBookmark, resultCreateBookmarkValues] = useMutation(gqlCreateAndUpdateBookmark
        , {
            update: (cache, {data: {createBookmark}}) => {

                // console.log("onCreateBookmark : ", createBookmark)
                // const data1 = cache.readQuery({
                //     query: gqlIsBookmark,
                //     variables: {
                //         userId: createBookmark.userId,
                //         postId: createBookmark.postId
                //     }
                // });
        
                // let newData = {...data1.isBookmark}
                // newData = {...newData, data: createBookmark}
                
                // cache.writeQuery({
                //     query: gqlIsBookmark,
                //     data: {
                //     isBookmark: newData
                //     },
                //     variables: {
                //         userId: createBookmark.userId,
                //         postId: createBookmark.postId
                //     }
                // });
            },
            onCompleted({ data }) {
              // console.log("bookmark :::: onCompleted")
            },
          },  
    );

    console.log("resultCreateBookmarkValues :", resultCreateBookmarkValues)

    ///////////////////////
    const columns = useMemo(
        () => [
        {
            Header: 'Name',
            columns: [
            {
                Header: 'Image',
                // accessor: 'image',
                Cell: props =>{

                    let userValue = useQuery(gqlUser, {
                        variables: {id: props.row.original.userId},
                        notifyOnNetworkStatusChange: true,
                    });

                    return  userValue.loading 
                    ?   <LinearProgress sx={{width:"100px"}} />
                    :   <Avatar
                            sx={{
                                height: 100,
                                width: 100
                            }}
                            variant="rounded"
                            alt="Example Alt"
                            src={userValue.data.user.data.image[0].base64}
                            />

                    // if(props.row.original.image.length < 1){
                    //     return <Avatar
                    //             sx={{
                    //                 height: 100,
                    //                 width: 100
                    //             }}>A</Avatar>
                    // }
                    // return (
                    // <div style={{ position: "relative" }}>
                    //     <Avatar
                    //     sx={{
                    //         height: 100,
                    //         width: 100
                    //     }}
                    //     variant="rounded"
                    //     alt="Example Alt"
                    //     src={props.row.original.image[0].base64}
                    //     />
                    // </div>
                    // );
                }
            },
            {
                Header: 'UserId',
                accessor: 'userId',
                Cell: props =>{

                    let userValue = useQuery(gqlUser, {
                        variables: {id: props.value},
                        notifyOnNetworkStatusChange: true,
                    });

                    return  userValue.loading 
                            ?   <LinearProgress sx={{width:"100px"}} />
                            :   <Typography variant="overline" display="block" gutterBottom>
                                    {userValue.data.user.data.displayName}
                                </Typography>
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
    
    return (  <div style={{ height: 700, width: "1000px" }}>
                    <Table
                        columns={columns}
                        data={followers}
                        updateMyData={updateMyData}
                        skipReset={skipResetRef.current}
                        isDebug={false}
                    />
                </div>);
};

export default UserEditPanelFollower;
