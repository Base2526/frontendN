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

import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import ReadMoreMaster from "../../utils/ReadMoreMaster"
import Table from "../../TableContainer"
import { gqlPost, gqlCreateAndUpdateBookmark, gqlIsBookmark} from "../../gqlQuery"

const UserEditPanelBookmark = ({bookmarks}) => {

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
                Header: 'PostId',
                accessor: 'postId',
                Cell: props =>{

                    let postValue = useQuery(gqlPost, {
                        variables: {id: props.row.original.postId},
                        notifyOnNetworkStatusChange: true,
                    });
            
                    return  postValue.loading 
                            ? <LinearProgress sx={{width:"100px"}} />
                            : <Typography variant="overline" display="block" gutterBottom>
                                {postValue.data.post.data.title}
                            </Typography>
                }
            },
            {
                Header: 'Action',
                Cell: props => {
                    return  <div>
                                <button
                                onClick={(e)=>{
                                    let input = _.omitDeep(props.row.original, ['__typename', 'id'])

                                    input = {...input, status: !input.status}
                                    onCreateBookmark({ variables: { input } }); 
                                }}
                                >{props.row.original.status ? "Unbookmark" : "Bookmark"}</button>
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
    
    return (  <div style={{ height: 700, width: "1000px" }}>
                    <Table
                        columns={columns}
                        data={bookmarks}
                        updateMyData={updateMyData}
                        skipReset={skipResetRef.current}
                        isDebug={false}
                    />
                </div>);
};

export default UserEditPanelBookmark;
