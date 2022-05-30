import React from "react";
import { CKEditor } from "ckeditor4-react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Editor = (props) => {
  return (
    <Box>
      {props.label ? (
        <Typography variant="subtitle1" gutterBottom component="div">
          {props.label}
        </Typography>
      ) : (
        ""
      )}

      <CKEditor label="Descrition" initData={""} />
    </Box>
  );
};

export default Editor;
