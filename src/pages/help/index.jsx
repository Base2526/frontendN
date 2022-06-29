import React , {useState, useEffect} from "react";
import { useQuery } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@material-ui/core/Typography";

import {gqlBasicContent} from "../../gqlQuery"

const index = (props) => {

    const basicContentValue = useQuery(gqlBasicContent, {
        variables: {id: "62b41f0c4212ba025fa518f0"},
        notifyOnNetworkStatusChange: true,
    });
    
    console.log("basicContentValue :", basicContentValue)

/*

*/

    return (
        <div>
            {
                basicContentValue.loading
                ? <CircularProgress />
                : <Typography dangerouslySetInnerHTML={{ __html: basicContentValue.data.basicContent.data.description }} />
            }
        </div>
    );
};

export default index;