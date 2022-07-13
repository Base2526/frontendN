import React, { useState, useEffect, withStyles } from "react";
import Button from "@mui/material/Button";
import { useQuery, useMutation } from "@apollo/client";
import _ from "lodash"

import { gqlFollower, gqlCreateAndUpdateFollow, gqlIsFollow } from "../../gqlQuery"

const ItemFollowing = (props) => {
    let {id, user, onFollowing, onDialogLogin} = props

    if(!_.isEmpty(user)){
        let isFollowValues = useQuery(gqlIsFollow, {
            variables: {userId: user.id, friendId: id},
            notifyOnNetworkStatusChange: true,
        });

        if(!isFollowValues.loading &&  ( isFollowValues.data.isFollow.data != null && isFollowValues.data.isFollow.data.status ) ){
            return  <Button
                        variant="contained" 
                        color="primary"
                        onClick={(e)=>{
                            !_.isEmpty(user)
                            ? onFollowing({ userId: user.id, friendId: id, status: false })
                            : onDialogLogin(true)
                        }}>
                        Following
                    </Button>
        }
    }

    return  <Button
                variant="contained" 
                color="primary"
                onClick={(e)=>{
                    !_.isEmpty(user)
                    ? onFollowing({ userId: user.id, friendId: id, status: true })
                    : onDialogLogin(true)
                }}>
                Follow
            </Button>
}
export default ItemFollowing;