import React from "react";

const Panel =(props) => {
  console.log("Panel props.children: ", props.children);
  return <div>{props.children}</div>;
}

export default Panel
