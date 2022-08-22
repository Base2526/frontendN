import React, { useState, useEffect, withStyles } from "react";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";

import { useApolloClient } from '@apollo/client';

import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

// import { checkAuth } from "../../AuthProvider"

import { logout } from "../../redux/actions/auth"

const index = (props) => {
  let history = useHistory();

  const client = useApolloClient();

  let {logout} = props

  let user = props.user;//checkAuth()

  let imageSrc =  _.isEmpty(user.image) ? "" : user.image[0].base64

  return (
    <div>
      <div>Profiles</div>

      <Stack direction="row" spacing={2}>
        <Avatar
          className={"user-profile"}
          sx={{
            height: 80,
            width: 80
          }}
          variant="rounded"
          alt="Example Alt"
          src={imageSrc}
        />
      </Stack>

      <Typography variant="overline" display="block" gutterBottom>
        Name : {user.displayName}
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        Email : {user.email}
      </Typography>


      <Button onClick={async() => { 
        logout()
        // logout(); 
        // window.location.reload(false)

        await client.refetchQueries({
          include: "all", // Consider using "active" instead!
        });

        // history.push("/")
        window.location.reload();

        history.push("/")
      }}>Logout</Button>
    </div>
  );
};

// export default index;

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps  :", state)
  return {
    user: state.auth.user,
  }
};

const mapDispatchToProps = {
  logout
}

export default connect( mapStateToProps, mapDispatchToProps )(index);
