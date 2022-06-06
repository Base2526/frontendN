import React, {useEffect} from "react";
import { CKEditor } from "ckeditor4-react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Editor = ({label, initData, onEditorChange}) => {

  useEffect(()=>{
    // console.log("initData :", initData)
  }, [])

  return (
    <Box>
      {label ? (
        <Typography variant="overline" display="block" gutterBottom>
          {label}
        </Typography>
      ) : (
        ""
      )}
      <CKEditor label="Descrition" initData={initData} onChange={(event)=>{onEditorChange(event.editor.getData())}} />
    </Box>
  );
};

export default Editor;
