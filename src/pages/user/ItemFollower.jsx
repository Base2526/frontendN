import React, { useState, useEffect, withStyles } from "react";
import Button from "@mui/material/Button";
import { useQuery } from "@apollo/client";
import { gqlFollower } from "../../gqlQuery"

const ItemFollower = (props) => {
    let {id, onFollower} = props

    let followerValues = useQuery(gqlFollower, {
        variables: {userId: id},
        notifyOnNetworkStatusChange: true,
    });
    
    return <Button
                variant="contained" 
                color="primary"
                onClick={onFollower}>Follower({followerValues.loading ? 0 : followerValues.data.follower.data.length})</Button>
}
export default ItemFollower;