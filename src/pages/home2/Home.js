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

import { useQuery } from "@apollo/client";
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

import {gqlHomes} from "../../gqlQuery"

import {checkAuth, getPermissions} from "../../components/provider/AuthProvider"

const Home = (props) => {
  let history = useHistory();

  const [keywordSearch, setKeywordSearch] = useState("");
  const [category, setCategory] = useState([0,1]);
  const [page, setPage] = useState(0);                             // Page number
  const [rowsPerPage, setRowsPerPage] = useState(10);              // Number per page
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
  const [report, setReport] = useState({open: false, portId:""});

  const [dialogProfile, setDialogProfile] = useState({open: false, id:""});
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  const { error, data, loading, networkStatus } = useQuery(gqlHomes, {
    variables: {page, perPage: rowsPerPage, keywordSearch: keywordSearch, category: category.join()},
    notifyOnNetworkStatusChange: true,
  });

  console.log("error, data, loading, networkStatus :", error, data, loading, networkStatus, category.join())

  useEffect(async() => {
    // setDatas(await getList("posts", {}))

    let permissions = await getPermissions()
    let auth = await checkAuth()

    console.log("Home : ", permissions, auth)
  }, []);

  // useEffect(async() => {
  //   // console.log("useEffect :", page, rowsPerPage)

  //   // const { error, data, loading, networkStatus } = useQuery(query, {
  //   //   // variables: {},
  //   //   notifyOnNetworkStatusChange: true,
  //   // });
  
  //   // console.log("useEffect :", loading, data)
  // }, [page, rowsPerPage]);

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

                setReport({open: true, portId:index})
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
            loading
            ? <div><CircularProgress /></div> 
            : 
              <div>
                <Container>
                  <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {data.Homes.data.map(
                      (n, index) => {
                        return (
                          <div key={n.id}>
                            <MasonryCard 
                              n={n} 
                              index={index} 
                              onPanelComment={(data)=>{
                                setPanelComment(data)
                              }}
                              onSnackbar={async(data)=>{
                                // setSnackbar(data)

                                setSnackbar({open: true, message:"Follow"});

                                // await socket().emit('follow', {test: "1234"}, (values)=>{
                                //   // console.log(error);
                                //   console.log(values);

                                //   setSnackbar({open: true, message:"Follow"});
                                // });
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

                              // setReport({open: true, portId:index})
                              onDialogProfileOpen={(index, e)=>{
                                // handleAnchorElSettingOpen(index, e)
                                // 
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

                      // navigate.push({
                      //   pathname: "/",
                      //   search: "?sort=date&order=newest"
                      // });

                      // console.log("onRowsPerPageChange :", parseInt(event.target.value, 10))
                    }}
                    count={data.Homes.total}
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
            // setPaneRightOpen(false);
            let newPanelComment = { ...panelComment };
            newPanelComment = { ...newPanelComment, isOpen: false };
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
        report.open && <ReportDialog open={report.open} portId={report.portId} onClose={()=>setReport({open: false, portId:""})}/>
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
        {/* {
        [
          { icon: <FileCopyIcon />, name: 'Copy' },
          { icon: <SaveIcon />, name: 'Save' },
          { icon: <PrintIcon />, name: 'Print' },
          { icon: <ShareIcon />, name: 'Share' },
        ].map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
        ))
        } */}
      </SpeedDial>
    </div>
  );
}

export default Home; 