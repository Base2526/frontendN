import React, { useState, useEffect, withStyles } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import _ from "lodash"
import { useHistory } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import { gqlPostsByUser, gqlCreateShare } from "../../gqlQuery"
import ItemComment from "../home/ItemComment"
import ItemBookmark from "../home/ItemBookmark"
import ItemShare from "../home/ItemShare"
import PanelComment from "../home/PanelComment";

const UserPostList = (props) => {
    let history = useHistory();
    let {id, user, onReport} = props

    const [anchorElSetting, setAnchorElSetting] = useState(null);
    const [anchorElShare, setAnchorElShare] = useState(null);
    const [panelComment, setPanelComment] = useState({
        isOpen: false,
        commentId: ""
    });

    const [lightbox, setLightbox] = useState({
        isOpen: false,
        photoIndex: 0,
        images: []
    });

    const [onCreateShare, resultCreateShare] = useMutation(gqlCreateShare, {
        onCompleted({ data }) {
          // history.push("/");
        }
    });
    console.log("resultCreateShare :", resultCreateShare)

    const postsByUser = useQuery(gqlPostsByUser, {
        variables: { userId: id },
        notifyOnNetworkStatusChange: true,
    });

    const handleAnchorElSettingOpen = (index, event) => {
        setAnchorElSetting({ [index]: event.currentTarget });
    };

    const handleAnchorElSettingClose = () => {
        setAnchorElSetting(null);
    };

    const handleAnchorElShareOpen = (index, event) => {
        setAnchorElShare({ [index]: event.currentTarget });
    };

    const handleAnchorElShareClose = () => {
        setAnchorElShare(null);
    };

    const menuShare = (item, index) =>{
        return  <Menu
                  anchorEl={anchorElShare && anchorElShare[index]}
                  keepMounted
                  open={anchorElShare && Boolean(anchorElShare[index])}
                  onClose={(e)=>handleAnchorElShareClose()}
                  // onClose={()=>{
                  //     console.log("Menu onClose")
                  // }}
                //   getContentAnchorEl={null}
                  anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                  }}
                  transformOrigin={{
                      vertical: "top",
                      horizontal: "center"
                  }}
                  MenuListProps={{
                      "aria-labelledby": "lock-button",
                      role: "listbox"
                  }}
                  >
                  <MenuItem onClose={(e)=>handleAnchorElShareClose()}>
                      {/* <FacebookShareButton
                        url={window.location.href + "detail/" + item.id}
                        quote={item.title}
                        hashtag={"#hashtag"}
                        description={item.title}
                        className="Demo__some-network__share-button"
                      >
                      <FacebookIcon size={32} round /> Facebook
                      </FacebookShareButton> */}

                    <div onClick={(e)=>{
                        if(_.isEmpty(user)){
                            setDialogLoginOpen(true)
                        }else{
                            onCreateShare({ variables: { input: {
                                    postId: item.id,
                                    userId: user.id,
                                    destination: "facebook"
                                }
                                }
                            });  
                        }
                        handleAnchorElShareClose()
                    }}>
                    <FacebookIcon size={32} round /> Facebook
                    </div>
                  </MenuItem>{" "}
                  <MenuItem onClose={(e)=>handleAnchorElShareClose()}>
                      {/* <TwitterShareButton
                        title={item.title}
                        url={window.location.href + "detail/" + item.id}
                        hashtags={["hashtag1", "hashtag2"]}
                      >
                      <TwitterIcon size={32} round />
                      Twitter
                      </TwitterShareButton> */}

                        <div onClick={(e)=>{
                            if(_.isEmpty(user)){
                                setDialogLoginOpen(true)
                            }else{
                                onCreateShare({ variables: { input: {
                                        postId: item.id,
                                        userId: user.id,
                                        destination: "twitter"
                                    }
                                    }
                                });  
                            }
                            handleAnchorElShareClose()
                        }}>
                        <TwitterIcon size={32} round />Twitter
                        </div>
                  </MenuItem>
                </Menu>
    }
    
    const menuSetting = (item, index) =>{
        return  <Menu
                  anchorEl={anchorElSetting && anchorElSetting[index]}
                  keepMounted
                  open={anchorElSetting && Boolean(anchorElSetting[index])}
                  onClose={handleAnchorElSettingClose}
                //   getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                  MenuListProps={{
                    "aria-labelledby": "lock-button",
                    role: "listbox"
                  }}
                >
                  {/* {
                    !_.isEmpty(user) && user.id == item.ownerId
                    ? <MenuItem onClick={(e)=>{
                        handleAnchorElSettingClose()
                        history.push("/post/"+item.id+ "/edit");
                      }}>
                        Edit
                      </MenuItem>
                    : <div /> 
                  } */}
                  
                  <MenuItem onClick={(e)=>{
                    handleAnchorElSettingClose()
                    // if(_.isEmpty(user)){
                    //   setDialogLoginOpen(true)
                    // }else{
                    //   setReport({open: true, postId:item.id})
                    // }
                    onReport(item.id)
                  }}>
                    Report
                  </MenuItem>
                </Menu>
    }

    return (
        <div>
            {
                postsByUser.loading
                ?   <div><CircularProgress /></div> 
                :   <div>
                        <>Post {postsByUser.data.postsByUser.data.length}</> 
                        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                            {
                                _.map(postsByUser.data.postsByUser.data, (item, index)=>{
                                    return  <div key={item.id}>
                                                <CardHeader
                                                    action={
                                                    <IconButton aria-label="settings" onClick={(e)=>{
                                                        console.log("settings")
                                                        handleAnchorElSettingOpen(index, e)
                                                    }}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    }
                                                    subheader={moment(item.createdAt).format('MMMM Do YYYY')}/>
                                                <CardContent>
                                                    <div style={{ position: "relative", paddingBottom: "10px" }}>
                                                        <IconButton
                                                            onClick={(e)=>{
                                                                setLightbox({ isOpen: true, photoIndex: 0, images:item.files })
                                                            }}
                                                            >
                                                            <Avatar
                                                                sx={{ width: 100, height: 100 }}
                                                                variant="rounded"
                                                                alt="Remy Sharp"
                                                                src={item.files.length < 1 ? "" : item.files[0].base64}
                                                            
                                                            />
                                                        </IconButton>
                                                        {item.files.length > 1 
                                                        ? <div
                                                            style={{
                                                                position: "absolute",
                                                                bottom: "15px",
                                                                // right: "5px",
                                                                padding: "5px",
                                                                backgroundColor: "#e1dede",
                                                                borderRadius: "5px",
                                                                margin: "5px",
                                                                color: "#919191"
                                                            }}
                                                            >{item.files.length}</div>
                                                        : <div />}
                                                    </div>

                                                    {/* onLightbox({ isOpen: true, photoIndex: 0, images:m.files }) */}

                                                    <>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        หัวข้อร้องเรียน : {item.title}
                                                    </Typography>
                                                    
                                                    <Typography
                                                    style={{ cursor: "pointer" }}
                                                    variant="subtitle2"
                                                    color="textSecondary"
                                                    >
                                                    ชื่อ-นามสกุล : {item.nameSubname}
                                                    </Typography>
                                            
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                    ยอดเงิน : {item.amount}
                                                    </Typography>
                                                    </>
                                                    <React.Fragment>
                                                        <Typography
                                                        sx={{ display: "inline" }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                            >
                                                            รายละเอียด :
                                                        </Typography>
                                                        { item.description }
                                                    </React.Fragment>
                                                </CardContent>

                                                <div>
                                                    <ItemBookmark {...props} item={item}/>
                                                    <ItemShare 
                                                        {...props} 
                                                        index={index}
                                                        item={item}
                                                        onAnchorElShareOpen={(index, e)=>{
                                                            console.log("onAnchorElShareOpen", index, e)
                                                            handleAnchorElShareOpen(index, e)
                                                        }}/>
                                                    <ItemComment 
                                                        {...props} 
                                                        item={item}
                                                        onPanelComment={(data)=>{
                                                            // console.log("onPanelComment")
                                                            setPanelComment(data)
                                                        }}/>
                                                    <IconButton onClick={(e) => {
                                                        history.push("/detail/" + item.id);
                                                    }}>
                                                        <OpenInNewIcon /> 
                                                    </IconButton>
                                                </div>
                                                <Divider />

                                                {menuSetting(item, index)}
                                                {menuShare(item, index)}
                                            </div>
                                })
                            }
                        </List>
                    </div>
            } 

            {panelComment.isOpen && (
                <PanelComment
                    user={user}
                    commentId={panelComment.commentId}
                    isOpen={panelComment.isOpen}
                    onRequestClose={() => {
                        let newPanelComment = { ...panelComment, isOpen: false };
                        setPanelComment(newPanelComment);
                    }}
                    onSignin={(e)=>{
                        setDialogLoginOpen(true);
                    }}/>
            )}

            {lightbox.isOpen && (
                <Lightbox
                mainSrc={lightbox.images[lightbox.photoIndex].base64}
                nextSrc={lightbox.images[(lightbox.photoIndex + 1) % lightbox.images.length].base64}
                prevSrc={
                    lightbox.images[(lightbox.photoIndex + lightbox.images.length - 1) % lightbox.images.length].base64
                }
                onCloseRequest={() => {
                    setLightbox({ ...lightbox, isOpen: false });
                }}
                onMovePrevRequest={() => {
                    setLightbox({
                    ...lightbox,
                    photoIndex:
                        (lightbox.photoIndex + lightbox.images.length - 1) % lightbox.images.length
                    });
                }}
                onMoveNextRequest={() => {
                    setLightbox({
                    ...lightbox,
                    photoIndex: (lightbox.photoIndex + 1) % lightbox.images.length
                    });
                }}
                />
            )}
        </div>
    );
};

export default UserPostList;
