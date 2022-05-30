import React, { useState, useEffect } from "react";
// import { notes } from "../data/db";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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


import PanelComment from "./PanelComment";
import PopupSnackbar from "./PopupSnackbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Detail from "./Detail";
import { socket } from "../../SocketioClient";
import DialogLogin from "./DialogLogin";
import { getList } from "../../components/provider/DataProvider";

import ReportDialog from "../../components/report"

const images = [
  "//placekitten.com/1500/500",
  "//placekitten.com/4000/3000",
  "//placekitten.com/800/1200",
  "//placekitten.com/1500/1500"
];

const Home = (props) => {
  const [note, setNote] = useState([]);

  // const [datas, setDatas] = useState([]);
  // const [total, setTotal] = useState(0)

  const [datas, setDatas] = useState({data: null, total: 0});

  const navigate = useHistory();
  const [keywordSearch, setKeywordSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  useEffect(async() => {
    // setNote(notes);

    // let {data, total} = await getList("posts", {})
    // setDatas(data)
    // setTotal(total)

    setDatas(await getList("posts", {}))
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

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

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

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

  const menuSetting = (index) =>{
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
            console.log("SearchBar onChange :", data, topic);

            setKeywordSearch(data);
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
            _.isEmpty(datas.data) 
            ? <div><CircularProgress /></div> 
            : 
              <div>
                <Container>
                  <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {datas.data.map(
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

                                await socket().emit('follow', {test: "1234"}, (values)=>{
                                  // console.log(error);
                                  console.log(values);

                                  setSnackbar({open: true, message:"Follow"});
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
                              />

                              {menuShare(index)}
                              {menuSetting(index)}

                              
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

                      navigate.push({
                        pathname: "/",
                        search: "?sort=date&order=newest"
                      });
                    }}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                      setRowsPerPage(parseInt(event.target.value, 10));
                      setPage(0);

                      navigate.push({
                        pathname: "/",
                        search: "?sort=date&order=newest"
                      });
                    }}
                    count={datas.total}
                  />
                </Container>

                {/* <ReportDialog /> */}
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
    </div>
  );
}

export default Home; 