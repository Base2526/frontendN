import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { IconButton, Typography, makeStyles } from "@material-ui/core";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import Avatar from "@material-ui/core/Avatar";
import { yellow, green, pink, blue } from "@material-ui/core/colors";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardActionArea from "@material-ui/core/CardActionArea";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Divider from "@material-ui/core/Divider";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import moment from "moment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";


import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import ReadMoreMaster from "../../utils/ReadMoreMaster"


const useStyles = makeStyles({
  avatar: {
    backgroundColor: (n) => {
      if (n.category === "work") {
        return yellow[700];
      }
      if (n.category === "money") {
        return green[500];
      }
      if (n.category === "todos") {
        return pink[500];
      }
      return blue[500];
    }
  },
  icon: {
    position: "relative",
    top: 0,
    left: 0,
    float: "right"
  }
});

const MasonryCard =({ n, index, onPanelComment, onSnackbar, onLightbox, onAnchorElShareOpen, onAnchorElSettingOpen, onDialogProfileOpen }) => {
  const classes = useStyles(n);

  const [expand, setExpand] = useState(false);
  const onClick = () => {
    setExpand(!expand);
  };

  const renderMedia = (m) =>{
    if( !_.isEmpty(m.files) ){
        return <CardActionArea
          style={{ position: "relative", paddingBottom: "10px" }}
        >
          <CardMedia
            component="img"
            height="194"
            image={ m.files[0].base64 }
            alt={ m.files[0].fileName }
            onClick={() => {
              onLightbox({ isOpen: true, photoIndex: 0, images:m.files })
            }}
          />
          
            {m.files.length > 1 ?
              <div
                  style={{
                      position: "absolute",
                      bottom: "15px",
                      right: "5px",
                      padding: "5px",
                      backgroundColor: "#e1dede",
                      borderRadius: "5px",
                      margin: "5px",
                      color: "#919191"
                  }}
                  >{m.files.length}</div>
              : <div />}
        
        </CardActionArea>
    }else{
        return <div />
    }
     
  }

  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{"A"}</Avatar>}
          action={
            <IconButton onClick={(e) => {
                onAnchorElSettingOpen(index, e);
            }}>
              <MoreVertIcon />
            </IconButton>
          }
          // onDialogProfileOpen
          title={ <Typography onClick={onDialogProfileOpen} variant="subtitle2" gutterBottom component="div">{n.title}</Typography> }
          subheader={moment(n.createdAt).format('MMMM Do YYYY')}
        />
        <CardContent>

          {/* <div>
          <Accordion 
          // expanded={false}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={(e)=>{
                console.log("expanded")
              }}
            >
              <Typography>text</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          </div> */}
          <div>
            {renderMedia(n)}
            <CardActionArea style={{}}>
                <Typography variant="subtitle2" color="textSecondary">
                    หัวข้อร้องเรียน : {n.title}
                </Typography>
                
                <Typography
                  style={{ cursor: "pointer" }}
                  variant="subtitle2"
                  color="textSecondary"
                >
                  ชื่อ-นามสกุล : {n.nameSubname}
                </Typography>
           
                <Typography variant="subtitle2" color="textSecondary">
                  ยอดเงิน : {n.amount}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  วันที่โอน : {moment(n.dateTranfer).format('MMMM Do YYYY')}
                </Typography>
                     
                <ReadMoreMaster
                  parentClass={"read-more-master"}
                  byWords={true}
                  length={15}
                  readMore="See More"
                  readLess="See less" 
                  ellipsis="...">{"รายละเอียด :" + n.description}</ReadMoreMaster>
            </CardActionArea>
          </div>
          <Divider light />
          <div>
            <IconButton onClick={(e) => {
              onSnackbar({open: true, message:"Follow"});
            }}>
              <BookmarkIcon />
            </IconButton>
            <IconButton onClick={(e) => {
              onAnchorElShareOpen(index, e);
            }}>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={(e) => {
              onPanelComment({ isOpen: true, commentId: 3456 })
            }}>
              <CommentIcon />
            </IconButton>
            <IconButton onClick={(e) => {
              // onPanelComment({ isOpen: true, commentId: 3456 })

              console.log("ExpandMoreIcon")
            }}>
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MasonryCard
