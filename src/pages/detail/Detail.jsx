import "./Detail.css"

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, Typography, makeStyles } from "@material-ui/core";
import moment from "moment";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

import _ from "lodash";
import deepdash from "deepdash";
deepdash(_);

import ReadMoreMaster from "../../utils/ReadMoreMaster"
import {gqlPost, gqlComment, gqlCreateComment, gqlCreateBookmark, gqlIsBookmark, gqlBookmarksByPostId, gqlBanks} from "../../gqlQuery"
import data from "../home/data.json";
import { CommentSection } from "../../components/comment";

import DialogLogin from "../../DialogLogin";

import { getPermissions } from "../../AuthProvider"

const Detail = (props) => {
    const { pathname } = useLocation();
    let { id } = useParams();

    let userId2 = "62a31ce2ca4789003e5f5123";

    const [anchorElShare, setAnchorElShare] = useState(null);
    const [anchorElSetting, setAnchorElSetting] = useState(null);
    const [dialogLoginOpen, setDialogLoginOpen] = useState(false);
    
    const check = () =>{
        let permissions = getPermissions()
        if( permissions && (permissions.includes("authenticated") || permissions.includes("administrator"))){
            return true
        }
        return  false
    }

    const handleAnchorElSettingOpen = (index, event) => {
        setAnchorElSetting(event.currentTarget);
    };

    const handleAnchorElSettingClose = () => {
        setAnchorElSetting(null);
    };
    
    const [lightbox, setLightbox] = useState({
        isOpen: false,
        photoIndex: 0,
        images: []
    });

    const [comment, setComment] = useState(data);
    const userId = "01a";
    const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random";
    const name = "xyz";
    const signinUrl = "/signin";
    const signupUrl = "/signup";
    let count = 0;
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    let valueBanks = useQuery(gqlBanks, {
        variables: {page: 0, perPage: 100},
        notifyOnNetworkStatusChange: true,
    });

    // console.log("valueBanks :", valueBanks)

    const [onCreateComment, resultCreateComment] = useMutation(gqlCreateComment, 
        {
            update: (cache, {data: {createComment}}) => {
                const data1 = cache.readQuery({
                    query: gqlComment,
                    variables: {postId: id}
                });
    
                let newData = {...data1.Comment}
                newData = {...newData, data: createComment.data}
                    
                cache.writeQuery({
                    query: gqlComment,
                    data: {
                        Comment: newData
                    },
                    variables: {
                        postId: id
                    }
                });
            },
            onCompleted({ data }) {
                // console.log("onCompleted")
            }
        }
    );
    // console.log("resultCreateComment :", resultCreateComment)

    const [onCreateBookmark, resultCreateBookmarkValues] = useMutation(gqlCreateBookmark
        , {
            update: (cache, {data: {createBookmark}}) => {
                const data1 = cache.readQuery({
                    query: gqlIsBookmark,
                    variables: {
                      userId: userId2,
                      postId: id
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
                        userId: userId2,
                        postId: id
                    }
                });        
            },
            onCompleted({ data }) {
            //   console.log("bookmark :::: onCompleted")
            },
          },  
      );


    let postValue = useQuery(gqlPost, {
        variables: {id: id},
        notifyOnNetworkStatusChange: true,
    });

    let commentValues = useQuery(gqlComment, {
        variables: {postId: id},
        notifyOnNetworkStatusChange: true,
    });
    // console.log("commentValues : ", commentValues)

    let bmValus = useQuery(gqlIsBookmark, {
        variables: {userId: userId2, postId: id},
        notifyOnNetworkStatusChange: true,
      });


    const menuShare = () =>{
        return  <Menu
                  anchorEl={anchorElShare}
                  keepMounted
                  open={anchorElShare}
                  onClose={(e)=>{
                    setAnchorElShare(null);
                  }}
                  getContentAnchorEl={null}
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
                  <MenuItem onClose={(e)=>{
                    setAnchorElShare(null);
                  }}>
                      <FacebookShareButton
                      url={"https://peing.net/ja/"}
                      quote={"quotequotequotequote"}
                      hashtag={"#hashtag"}
                      description={"aiueo"}
                      className="Demo__some-network__share-button"
                      >
                      <FacebookIcon size={32} round /> Facebook
                      </FacebookShareButton>
                  </MenuItem>{" "}
                  <MenuItem onClose={(e)=>{
                    setAnchorElShare(null);
                  }}>
                      <TwitterShareButton
                      title={"test"}
                      url={"https://peing.net/ja/"}
                      hashtags={["hashtag1", "hashtag2"]}
                      >
                      <TwitterIcon size={32} round />
                      Twitter
                      </TwitterShareButton>
                  </MenuItem>
                </Menu>
      }

    const iconBookmark =()=>{
        if(!bmValus.loading){

          if(bmValus.data.isBookmark.data === null){
    
            return  <IconButton onClick={(e) => {
                        onCreateBookmark({ variables: { input: {
                              postId: id,
                              userId: userId2,
                              status: true
                            }
                          }
                        }); 
                      }}>
                      <BookmarkIcon style={{ color:"" }} /> 
                    </IconButton>
          }
    
          let color = bmValus.data.isBookmark.data.status === null ? "" : bmValus.data.isBookmark.data.status ? "blue" : ""
    
          return  <IconButton onClick={(e) => {

                      check() 
                      ? onCreateBookmark({ variables: { input: {
                                postId: id,
                                userId: userId2,
                                status: !bmValus.data.isBookmark.data.status
                            }
                            }
                        })
                      : setDialogLoginOpen(true)
                    }}>
                    <BookmarkIcon style={{ color }} /> 
                  </IconButton>
            
        }
        return  <IconButton> <BookmarkIcon style={{ color:"" }} /> </IconButton>
    }
    
    const iconShare = () =>{
        return <IconButton onClick={(e) => {
            // onAnchorElShareOpen(index, e);
            }}>
                <ShareIcon onClick={(event)=>{
            setAnchorElShare(event.currentTarget);
        }}/>
            
        </IconButton>
         
    }

    const iconMore = () =>{
        return <IconButton  onClick={(e) => {
                    // onAnchorElSettingOpen(index, e);
                    setAnchorElSetting(e.currentTarget);
                }}>
                    <MoreVertIcon />
                </IconButton>
    }

    const menuSetting = (item) =>{
        return  <Menu
                  anchorEl={anchorElSetting}
                  keepMounted
                  open={anchorElSetting && Boolean(anchorElSetting)}
                  onClose={handleAnchorElSettingClose}
                  getContentAnchorEl={null}
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
                  {/* <MenuItem onClick={(e)=>{
                    handleAnchorElSettingClose()
                    history.push("/post/"+item.id+ "/edit");
                  }}>
                    Edit
                  </MenuItem> */}
                  <MenuItem onClick={(e)=>{
                    handleAnchorElSettingClose()
    
                    // setReport({open: true, postId:item.id})
                  }}>
                    Report
                  </MenuItem>
                </Menu>
      }

    const bankView = (item) =>{
        if(valueBanks.loading){
            return <div />
        }
        let bank = _.find(valueBanks.data.Banks.data, (v) => v.id === item.bankId)
        return <li><Typography variant="subtitle2" color="textSecondary">{item.bankAccountName} [{bank === null ? "" : bank.name}]</Typography></li>
    }

    const mainView = () =>{
        let post = postValue.data.Post.data

        console.log("post :", post)
        return  <div className="col-container">
                    <div className="col1">
                        {
                            _.isEmpty(post.files) 
                            ?   <div />
                            :   <CardActionArea style={{ position: "relative", paddingBottom: "10px" }}>
                                    <CardMedia
                                        component="img"
                                        // height="194"
                                        image={  post.files[0].base64 }
                                        alt={ post.files[0].fileName }
                                        onClick={() => {
                                            setLightbox({ isOpen: true, photoIndex: 0, images:post.files })
                                        }}/>
                                    {post.files.length > 1 ?
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
                                        >{post.files.length}</div>
                                    : <div />}
                                </CardActionArea>

                        }

                        
                    </div>
                    <div className="col2">
                        <div className="col3">
                            <div>
                                <div>
                                    {iconBookmark()}
                                    {iconShare()}
                                    {iconMore()}
                                </div>
                            </div>
                            <Typography variant="subtitle2" color="textSecondary">
                                หัวข้อร้องเรียน : {post.title}
                            </Typography>
                            <Typography
                                style={{ cursor: "pointer" }}
                                variant="subtitle2"
                                color="textSecondary">
                                ชื่อ-นามสกุล : {post.nameSubname}
                            </Typography>
                    
                            <Typography variant="subtitle2" color="textSecondary">
                                ยอดเงิน : {post.amount}
                            </Typography>

                            <Typography variant="subtitle2" color="textSecondary">เบอร์โทร : 
                                <ul>
                                    {
                                        _.map(post.tels, (v)=>{
                                            return <li><Typography variant="subtitle2" color="textSecondary">{v}</Typography></li>
                                        })
                                    }
                                </ul>
                            </Typography>

                            <Typography variant="subtitle2" color="textSecondary">ธนาคาร : 
                                <ul>
                                    {
                                        _.map(post.banks, (v)=>{
                                            // return <li><Typography variant="subtitle2" color="textSecondary">{v.bankAccountName}</Typography></li>
                                        
                                            return bankView(v)
                                        })
                                    }
                                </ul>
                            </Typography>

                            {/* TEL. */}
                            <Typography variant="subtitle2" color="textSecondary">
                                วันที่โอน : {moment(post.dateTranfer).format('MMMM Do YYYY')}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">{"รายละเอียด :" + post.description}</Typography>
                        </div>
                        <div className="col4">
                            {
                                commentValues.loading 
                                ?  <div><CircularProgress /></div> 
                                :  <CommentSection
                                    // currentUser={
                                    //     userId && { userId: userId, avatarUrl: avatarUrl, name: name }
                                    // }
                                    currentUser={null}
                                    commentsArray={commentValues.data.comment.data}
                                    setComment={(data) => {
    
                                        let input = { postId: id, data: _.omitDeep(data, ['__typename']) }
                                        console.log("onComment input :", input);
    
                                        onCreateComment({ variables: { input: input }});
    
                                    }}
                                    signinUrl={signinUrl}
                                    signupUrl={signupUrl}
                                    onSignin={(e)=>{
                                        console.log("onSignin :", e)

                                        setDialogLoginOpen(true)
                                    }}/>
                                    
                            }
                           
                        </div>
                    </div>

                    {menuSetting(post)}
                </div>
    }

    return (
        <div>
            {
                postValue.loading
                ?   <div><CircularProgress /></div> 
                :   mainView()
            }

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
                    }}/>
            )}

            {menuShare()}

            {dialogLoginOpen && (
                <DialogLogin
                open={dialogLoginOpen}
                onClose={() => {
                    setDialogLoginOpen(false);
                }}
                />
            )}
        </div>
    );
};

export default Detail;
