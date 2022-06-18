import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import MasonryCard from "./MasonryCard";
import Masonry from "react-masonry-css";

import BookmarkIcon from '@mui/icons-material/Bookmark';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { useHistory } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Link from "@mui/material/Link";
import _ from "lodash";
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery, useMutation } from "@apollo/client";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

import PanelComment from "./PanelComment";
import PopupSnackbar from "./PopupSnackbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Detail from "./Detail";
import { socket } from "../../SocketioClient";
import DialogLogin from "./DialogLogin";
import ReportDialog from "../../components/report"
import DialogProfile from "../../components/dialogProfile"

import {gqlHomes, gqlUser, gqlCreateContactUs, gqlCreateBookmark} from "../../gqlQuery"

import {checkAuth, getPermissions} from "../../AuthProvider"

const Home = (props) => {
  let history = useHistory();

  const [keywordSearch, setKeywordSearch] = useState("");
  const [category, setCategory] = useState([0,1]);
  const [page, setPage] = useState(0);                             // Page number
  const [rowsPerPage, setRowsPerPage] = useState(30);              // Number per page
  const [dialogLoginOpen, setDialogLoginOpen] = useState(false);

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    photoIndex: 0,
    images: []
  });

  const [panelComment, setPanelComment] = useState({
    isOpen: false,
    commentId: 1234
  });

  const [anchorElSetting, setAnchorElSetting] = useState(null);
  const [anchorElShare, setAnchorElShare] = useState(null);
  const [snackbar, setSnackbar] = useState({open: false, message:""});
  const [report, setReport] = useState({open: false, postId:""});

  const [dialogProfile, setDialogProfile] = useState({open: false, id:""});
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  const [onCreateContactUs, resultCreateContactUsValues] = useMutation(gqlCreateContactUs
    , {
        onCompleted({ data }) {
          history.push("/");
        }
      }
  );

  console.log("resultCreateContactUsValues :", resultCreateContactUsValues)


  // 
  const [onCreateBookmark, resultCreateBookmarkValues] = useMutation(gqlCreateBookmark
    , {
        update: (cache, {data: {createBookmark}}) => {
          // Update the cache as an approximation of server-side mutation effects
          // console.log("update :", cache, createBookmark)

          /*
          const data = cache.readQuery({
            query: gqlHomes,
            variables: {
              page, 
              perPage: rowsPerPage, 
              keywordSearch: keywordSearch, 
              category: category.join()
            }
          });

          console.log("data :", data)

          let new_data = [...data.Homes.data]
          
          new_data[0] = {...new_data[0], title: "11111xxxx"}
          // xxx[0] = xxx1

          let new_homes = {...data.Homes, data: new_data}

          console.log("data.Homes : ", new_homes)
          cache.writeQuery({
            query: gqlHomes,
            data: {
              Homes: new_homes
            },
            variables: {
              page, 
              perPage: rowsPerPage, 
              keywordSearch: keywordSearch, 
              category: category.join()
            }
          });

          console.log("> update :", cache, createBookmark, data.Homes.data)
          */
        },
        onCompleted({ data }) {
          // history.push("/");
          console.log("onCompleted > onCreateBookmark")
        },
      },
      
  );

  const homesValues =useQuery(gqlHomes, {
    variables: {page, perPage: rowsPerPage, keywordSearch: keywordSearch, category: category.join()},
    notifyOnNetworkStatusChange: true,
  });

  console.log("homesValues :", homesValues)

  useEffect(async() => {

    let permissions = await getPermissions()
    let auth = await checkAuth()

    console.log("Home : ", permissions, auth)
  }, []);

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

  const snackbarClick = () => {
    setSnackbar({...snackbar, open: true});
  };

  const menuShare = (index) =>{
    return  <Menu
              anchorEl={anchorElShare && anchorElShare[index]}
              keepMounted
              open={anchorElShare && Boolean(anchorElShare[index])}
              onClose={(e)=>handleAnchorElShareClose()}
              // onClose={()=>{
              //     console.log("Menu onClose")
              // }}
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
              <MenuItem onClose={(e)=>handleAnchorElShareClose()}>
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
              <MenuItem onClose={(e)=>handleAnchorElShareClose()}>
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

  const menuSetting = (item, index) =>{
    return  <Menu
              anchorEl={anchorElSetting && anchorElSetting[index]}
              keepMounted
              open={anchorElSetting && Boolean(anchorElSetting[index])}
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
              <MenuItem onClick={(e)=>{
                handleAnchorElSettingClose()
                history.push("/post/"+item.id+ "/edit");
              }}>
                Edit
              </MenuItem>
              <MenuItem onClick={(e)=>{
                handleAnchorElSettingClose()

                setReport({open: true, postId:item.id})
              }}>
                Report
              </MenuItem>
            </Menu>
  }

  return (
    <div>
      <div>
        <SearchBar
          keyword={keywordSearch}
          onChange={(data, topic) => {
            setKeywordSearch(data);
            setCategory(_.filter(topic, (v)=>v.checked).map((v)=>v.key))
          }}
          onKeyDown={(ev) => {
            // key enter
            if (ev.keyCode == 13) {
              console.log("onKeyDown value", ev.target.value);
              // put the login here
            }
          }}
        />

        <div>
          {
            homesValues.loading
            ? <div><CircularProgress /></div> 
            : 
              <div>
                <Container>
                  <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {homesValues.data.Homes.data.map(
                      (n, index) => {
                        return (
                          <div key={n.id}>
                            <MasonryCard 
                              n={n} 
                              index={index} 
                              onPanelComment={(data)=>{
                                setPanelComment(data)
                              }}
                              // onSnackbar={async(data)=>{
                              //   // setSnackbar(data)

                              //   setSnackbar({open: true, message:"Follow"});

                              //   // await socket().emit('follow', {test: "1234"}, (values)=>{
                              //   //   // console.log(error);
                              //   //   console.log(values);

                              //   //   setSnackbar({open: true, message:"Follow"});
                              //   // });
                              // }}

                              onBookmark={(e)=>{

                                console.log("onBookmark : ", e)

                                onCreateBookmark({ variables: { input: {
                                      postId: "62a31ce2ca4789003e5f5123",
                                      userId: "62a2f65ecf7946010d3c75da",
                                      status: false
                                    }
                                  }
                                }); 
                              }}
                              onLightbox={(data)=>{
                                setLightbox(data)
                              }}

                              onAnchorElShareOpen={(index, e)=>{
                                handleAnchorElShareOpen(index, e)
                              }}
                            
                              onAnchorElSettingOpen={(index, e)=>{
                                handleAnchorElSettingOpen(index, e)
                              }}

                              onDialogProfileOpen={(index, e)=>{
                                setDialogProfile({open:true, id:11})
                              }}
                              />

                              {menuShare(index)}
                              {menuSetting(n, index)}

                              
                          </div>
                        );
                      }
                    )}
                  </Masonry>
                </Container>

                <Container sx={{ py: 2 }} maxWidth="xl">
                  <Pagination
                    page={page}
                    onPageChange={(event, newPage) => {
                      setPage(newPage);
                      // navigate.push({
                      //   pathname: "/",
                      //   search: "?sort=date&order=newest"
                      // });

                      // console.log("onPageChange :", event,  newPage)
                    }}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                      setRowsPerPage(parseInt(event.target.value, 10));
                      setPage(0);
                    }}
                    count={homesValues.data.Homes.total}
                  />
                </Container>
              </div>
          }
        </div>
        <Footer />
      </div>

      {snackbar.open && (
        <PopupSnackbar
          isOpen={snackbar.open}
          message={snackbar.message}
          onClose={() => {
            setSnackbar({...snackbar, open: false});
          }}
        />
      )}

      {panelComment.isOpen && (
        <PanelComment
          commentId={panelComment.commentId}
          isOpen={panelComment.isOpen}
          onRequestClose={() => {
            let newPanelComment = { ...panelComment, isOpen: false };
            setPanelComment(newPanelComment);
          }}
        />
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

      {dialogLoginOpen && (
        <DialogLogin
          open={dialogLoginOpen}
          onClose={() => {
            setDialogLoginOpen(false);
          }}
        />
      )}

      {
        report.open && <ReportDialog 
                        open={report.open} 
                        postId={report.postId} 
                        onReport={(e)=>{
                          console.log("onReport :", e)

                          onCreateContactUs({ variables: { input: {
                                  userId: "62a2c0cecf7946010d3c743f",
                                  postId: e.postId,     
                                  categoryId: e.categoryId,
                                  description: e.description
                                } 
                              } 
                          });

                          setReport({open: false, postId:""})
                        }}

                        // onCreateTContactUs
                        onClose={()=>setReport({open: false, postId:""})}/>
      }

      {

        dialogProfile.open &&  <DialogProfile open={dialogProfile.open} id={dialogProfile.id} onClose={()=>setDialogProfile({open: false, id:""})}/>
      }

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={(e)=>{
          history.push("/post/new");
        }}
      >
      </SpeedDial>
    </div>
  );
}

export default Home; 