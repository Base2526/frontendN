import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import {
  NewUserContainer,
  NewUserForm,
  FormItem,
  GenderContainer,
  NewUserButton,
  ButtonWrapper
} from "./User.styled";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useParams, Link } from "react-router-dom";

import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import ReadMoreMaster from "../../utils/ReadMoreMaster"
import Table from "../../TableContainer"

const UserEditPanelPosts = ({posts}) => {

  ///////////////////////
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Image',
            accessor: 'files',
            Cell: props =>{

              if(props.row.original.files.length < 1){
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
                    src={props.row.original.files[0].base64}
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
                      >{props.row.original.files.length}</div>
                </div>
              );
            }
          },
          {
            Header: 'Title',
            accessor: 'title',
            Cell: props => {
              return <Link to={`/detail/${props.row.original.id}`}>{props.row.original.title}</Link>
            }
          },
          {
            Header: 'Body',
            accessor: 'body',
            Cell: props => {
              return (
                <Box
                  sx={{
                    maxHeight: "inherit",
                    width: "100%",
                    whiteSpace: "initial",
                    lineHeight: "16px"
                  }}>
                  <ReadMoreMaster
                    byWords={true}
                    length={10}
                    ellipsis="...">{props.row.original.description}</ReadMoreMaster>
                </Box>
              );
            }
          },
          {
            Header: 'Created at',
            accessor: 'createdAt',
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
                    data={posts}
                    updateMyData={updateMyData}
                    skipReset={skipResetRef.current}
                    isDebug={false}
                />
            </div>);
};

export default UserEditPanelPosts;
