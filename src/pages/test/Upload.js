import React, { useState, useEffect, withStyles } from "react";
import { useMutation } from "@apollo/client";

import { gqlFileUpload } from "../../gqlQuery"

const Upload = (props) => {

    const [onFileUpload, resultFileUploadValues] = useMutation(gqlFileUpload
        , {
            context: {
                headers: {
                  'apollo-require-preflight': true,
                },
              },
            onCompleted({ data }) {
              console.log("onFileUpload onCompleted")
            }
          }
    );

    console.log("onFileUpload :", resultFileUploadValues)

    const onChange = (e) => {
        // if (validity.valid) mutate({ variables: { files } });

        console.log("e.target.files :", e.target.files)
        const file = e.target.files;
        if (!file) return;
        onFileUpload({ variables: { text: "abc", file } });
    }

    return (
        <input type="file" multiple required onChange={onChange} />
    );
};

export default Upload;
