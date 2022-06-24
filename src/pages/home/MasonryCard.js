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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import moment from "moment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import CircularProgress from '@mui/material/CircularProgress';
import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";


import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import ReadMoreMaster from "../../utils/ReadMoreMaster"

import {gqlUser, gqlComment, gqlShareByPostId, gqlCreateBookmark, gqlIsBookmark} from "../../gqlQuery"

// import { getPermissions } from "../../AuthProvider"
import { isAuth } from "../../AuthProvider"

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

const MasonryCard =({ n, index, onPanelComment, onLightbox, onAnchorElShareOpen, onAnchorElSettingOpen, onDialogLogin }) => {
  const classes = useStyles(n);
  let history = useHistory();

  let userId = "62a2c0cecf7946010d3c743f";

  const [expand, setExpand] = useState(false);

  const [onCreateBookmark, resultCreateBookmarkValues] = useMutation(gqlCreateBookmark
    , {
        update: (cache, {data: {createBookmark}}) => {
          const data1 = cache.readQuery({
            query: gqlIsBookmark,
            variables: {
              userId: userId,
              postId: n.id
            }
          });

          let newData = {...data1.isBookmark}
          newData = {...newData, data: createBookmark}
        
          cache.writeQuery({
            query: gqlIsBookmark,
            data: {
              isBookmark: newData
            },
            variables: {
              userId: userId,
              postId: n.id
            }
          });
        },
        onCompleted({ data }) {
          // console.log("bookmark :::: onCompleted")
        },
      },  
  );

  const handleCreateBookmark = (status) =>{
    
    if( !isAuth() ){
      onDialogLogin(true)
    }else{
      onCreateBookmark({ variables: { input: {
            postId: n.id,
            userId: userId,
            status
          }
        }
      }); 
    }
  }

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

  const viewHeader = ()=>{

    let userValue = useQuery(gqlUser, {
      variables: {id: n.ownerId},
      notifyOnNetworkStatusChange: true,
    });


    if(userValue.loading){
      return <div><CircularProgress /></div> 
    }else{
      return  <CardHeader
                avatar={<Avatar 
                          className={"card-header-title"} 
                          src={userValue.data.User.data.image[0].base64}
                          onClick={(e)=> history.push("/user/" + userValue.data.User.data.id +"/view") }  />}
                action={
                  <IconButton  onClick={(e) => {
                      onAnchorElSettingOpen(index, e);
                  }}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={ <Typography className={"card-header-title"} onClick={(e)=>{
                  history.push("/user/" + userValue.data.User.data.id +"/view");
                }} variant="subtitle2" gutterBottom component="div">{userValue.data.User.data.displayName}</Typography> }
                subheader={moment(n.createdAt).format('MMMM Do YYYY')}
                />
    }
  }

  const iconBookmark =()=>{

    const bmValus = useQuery(gqlIsBookmark, {
      variables: {userId: userId, postId: n.id},
      notifyOnNetworkStatusChange: true,
    });

    if(!bmValus.loading){
      if(bmValus.data.isBookmark.data === null){
        return  <IconButton onClick={(e) => {
                    handleCreateBookmark(true)
                  }}>
                  <BookmarkIcon style={{ color:"" }} /> 
                </IconButton>
      }

      let color = bmValus.data.isBookmark.data.status === null ? "" : bmValus.data.isBookmark.data.status ? "blue" : ""

      return  <IconButton onClick={(e) => {
                  handleCreateBookmark(!bmValus.data.isBookmark.data.status)
                }}>
                <BookmarkIcon style={{ color }} /> 
              </IconButton>
        
    }
    return  <IconButton onClick={(e) => {
                handleCreateBookmark(true)
              }}>
              <BookmarkIcon style={{ color:"" }} /> 
            </IconButton>
  }

  const iconShare = () =>{
    // gqlShareByPostId

    let shareValues = useQuery(gqlShareByPostId, {
      variables: {postId: n.id, page: 0, perPage: 1000},
      notifyOnNetworkStatusChange: true,
    });

    if(!shareValues.loading){
      if(shareValues.data.ShareByPostId.data.length == 0){
        return <ShareIcon />
      }

      return  <div>
                <ShareIcon />
                <div style={{
                    position: "absolute",
                    right: "5px",
                    borderRadius: "5px",
                    borderStyle: "solid",
                    borderColor: "red",
                    borderWidth: "1px",
                    fontSize: "10px"
                }}>{shareValues.data.ShareByPostId.data.length}</div>
              </div>
    }
    return <ShareIcon />
  }

  const iconComment = () =>{
    let commentValues = useQuery(gqlComment, {
      variables: {postId: n.id},
      notifyOnNetworkStatusChange: true,
    });

    if(!commentValues.loading){
      if(commentValues.data.Comment.data.length == 0){
        return <CommentIcon />
      }

      let count = 0;
      _.map(commentValues.data.Comment.data, (v) => {
        if (v.replies) {
          count += v.replies.length;
        }
      });

      return  <div>
                <CommentIcon />
                <div style={{
                  position: "absolute",
                  right: "5px",
                  borderRadius: "5px",
                  borderStyle: "solid",
                  borderColor: "red",
                  borderWidth: "1px",
                  fontSize: "10px"
                }}>{commentValues.data.Comment.data.length + count}</div>
              </div>
    }

    return <CommentIcon />
  }

  return (
    <div>
      <Card elevation={1} className={classes.test}>
        {viewHeader()}
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
            
            {iconBookmark()}
            <IconButton onClick={(e) => {
              onAnchorElShareOpen(index, e);
            }}>
              {iconShare()}
            </IconButton>
            <IconButton onClick={(e) => {
              onPanelComment({ isOpen: true, commentId: n.id })
            }}>
              {iconComment()}
            </IconButton>
            <IconButton onClick={(e) => {
              history.push("/detail/" + n.id);
            }}>
              <OpenInNewIcon /> 
            </IconButton>
            <IconButton onClick={(e) => {
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
