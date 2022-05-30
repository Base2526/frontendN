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

const MasonryCard =({ n, index, onPanelComment, onSnackbar, onLightbox, onAnchorElShareOpen, onAnchorElSettingOpen }) => {
  const classes = useStyles(n);

  const [expand, setExpand] = useState(false);
  const onClick = () => {
    setExpand(!expand);
  };

  const renderMedia = (m) =>{
    if(m.files){
        return <CardActionArea
        style={{ position: "relative", paddingBottom: "10px" }}
      >
        <CardMedia
          component="img"
          height="194"
          image={m.files[0].base64}
          alt={m.files[0].fileName}
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
          title={n.title}
          subheader={moment(n.dateTranfer).format('MMMM Do YYYY')}
        />
        <CardContent>
          <div>
            {renderMedia(n)}
            <CardActionArea style={{}}>
                <Typography variant="subtitle2" gutterBottom component="div">
                    หัวข้อร้องเรียน : {n.title}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary">
                    รายละเอียด : {n.body}
                </Typography> */}
                <ShowMoreText
                    lines={2}
                    more={"See more"}
                    less={""}
                    onClick={onClick}
                    className="show-more-text"
                    anchorClass="my-anchor-css-class"
                    expanded={expand}
                    width={400}
                    truncatedEndingComponent={"..."}
                >
                   รายละเอียด : {n.body}
                </ShowMoreText>
            </CardActionArea>
            <Typography variant="subtitle2" color="textSecondary">
              ยอดเงิน : {n.number}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              วันที่ : {moment(n.dateTranfer).format('MMMM Do YYYY')}
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              variant="subtitle2"
              color="textSecondary"
            >
              ชื่อ : {n.nameSubname}
            </Typography>
          </div>
          <Divider light />
          <div>
            <IconButton onClick={() => {
                onSnackbar({open: true, message:"Follow"});
            }}>
              <BookmarkIcon />
            </IconButton>
            <IconButton  onClick={(e) => {
                          onAnchorElShareOpen(index, e);
                        }}>
                <ShareIcon />
               
            </IconButton>
            <IconButton onClick={() => {
                onPanelComment({ isOpen: true, commentId: 3456 })
            }}>
              <CommentIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MasonryCard
