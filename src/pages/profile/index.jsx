import React, { useState, useEffect, withStyles } from "react";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import { checkAuth, logout } from "../../AuthProvider"

const index = (props) => {
  let history = useHistory();

  let user = checkAuth()

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


      <Button onClick={() => { 
        logout(); 
        window.location.reload(false)
      }}>Logout</Button>
    </div>
  );
};

export default index;
