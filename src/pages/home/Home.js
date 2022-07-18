import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import HomeItem from "./HomeItem";
import Masonry from "react-masonry-css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { useHistory } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import _ from "lodash";
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { connect } from "react-redux";

import PanelComment from "./PanelComment";
import PopupSnackbar from "./PopupSnackbar";
import Footer from "../footer";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import DialogLogin from "../../DialogLogin";
import ReportDialog from "../../components/report"
import DialogProfile from "../../components/dialogProfile"
import {gqlHomes, gqlCreateContactUs, gqlCurrentNumber, subPost} from "../../gqlQuery"

import { login } from "../../redux/actions/auth"

const Home = (props) => {
  let history = useHistory();

  let { user } = props

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
    commentId: ""
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
  // console.log("resultCreateContactUsValues :", resultCreateContactUsValues)

  // gqlCurrentNumber
  const [onCurrentNumber, resultCurrentNumberValues] = useMutation(gqlCurrentNumber
    , {
        onCompleted({ data }) {
          // history.push("/");
        }
      }
  );

  // /// 
  

  // let { data, loading } = useSubscription(subNumberIncremented, {
  //   onSubscriptionData: (res) => {
  //     // setDataFromCb(res.subscriptionData.data)
  //     console.log("onSubscriptionData")
  //   },
  // });
  


  const homesValues =useQuery(gqlHomes, {
    variables: {page, perPage: rowsPerPage, keywordSearch: keywordSearch, category: category.join()},
    notifyOnNetworkStatusChange: true,
  });

  console.log("homesValues :", homesValues )

  if(!homesValues.loading){

    // console.log("homesValues.data.homes.data :", homesValues.data.homes.data)

    var keys = _.map(homesValues.data.homes.data, _.property("id"));

    // const numberIncrementedValues = useSubscription(subNumberIncremented, 
    //   { variables: { postIDs: JSON.stringify(keys) } });
    // console.log("keys :", keys)

    let {subscribeToMore} = homesValues
    const unsubscribe =  subscribeToMore({
			document: subPost,
      variables: { postIDs: JSON.stringify(keys) },
			updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) return prev;

				console.log("updateQuery >> ", prev, subscriptionData);

        let { mutation, data } = subscriptionData.data.subPost;

        let prevData = prev.homes.data
        let newData = _.map(prevData, (o)=>{
                        if(o.id === data.id){
                          return data
                        }
                        return o
                      })

        let newPrev = {...prev.homes, data: newData}
        console.log("newPrev >> ", newPrev);
        return newPrev;
			}
		});

    console.log("unsubscribe :", unsubscribe)
  }

  // useEffect(()=>{
  //   console.log("useEffect user :", user)
  // }, [user])

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
              // getContentAnchorEl={null}
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
                    url={window.location.href + "detail/" + item.id}
                    quote={item.title}
                    hashtag={"#hashtag"}
                    description={item.title}
                    className="Demo__some-network__share-button"
                  >
                  <FacebookIcon size={32} round /> Facebook
                  </FacebookShareButton>
              </MenuItem>{" "}
              <MenuItem onClose={(e)=>handleAnchorElShareClose()}>
                  <TwitterShareButton
                    title={item.title}
                    url={window.location.href + "detail/" + item.id}
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
              {
                !_.isEmpty(user) && user.id == item.ownerId
                ? <MenuItem onClick={(e)=>{
                    handleAnchorElSettingClose()
                    history.push("/post/"+item.id+ "/edit");
                  }}>
                    Edit
                  </MenuItem>
                : <div /> 
              }
              
              <MenuItem onClick={(e)=>{
                handleAnchorElSettingClose()
                if(_.isEmpty(user)){
                  setDialogLoginOpen(true)
                }else{
                  setReport({open: true, postId:item.id})
                }
              }}>
                Report
              </MenuItem>
            </Menu>
  }

  return (
    <div style={{flex:1}}>
      <div>
        <SearchBar
          keyword={keywordSearch}
          onSearch={(data, topic)=>{
            setCategory(_.filter(topic, (v)=>v.checked).map((v)=>v.key))
            setKeywordSearch(data);
          }}
        />

        <div>
          {
            homesValues.loading || homesValues.data == undefined
            ? <div><CircularProgress /></div> 
            : <div>
                <Container>
                  <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {homesValues.data.homes.data.map(
                      (item, index) => {
                        return (
                          <div key={item.id}>
                            <HomeItem 
                              user={props.user}
                              item={item} 
                              index={index} 
                              onPanelComment={(data)=>{
                                setPanelComment(data)
                              }}
                              onLightbox={(data)=>{
                                setLightbox(data)

                                onCurrentNumber()
                                console.log("+++")
                              }}
                              onAnchorElShareOpen={(index, e)=>{
                                handleAnchorElShareOpen(index, e)
                              }}
                              onAnchorElSettingOpen={(index, e)=>{
                                handleAnchorElSettingOpen(index, e)
                              }}
                              onDialogProfileOpen={(index, e)=>{
                                setDialogProfile({open:true, id:e.ownerId})
                              }}
                              onDialogLogin={(status)=>{
                                setDialogLoginOpen(status)
                              }}
                              />
                              {menuShare(item, index)}
                              {menuSetting(item, index)}
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
                    }}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                      setRowsPerPage(parseInt(event.target.value, 10));
                      setPage(0);
                    }}
                    count={homesValues.data.homes.total}
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
          user={props.user}
          commentId={panelComment.commentId}
          isOpen={panelComment.isOpen}
          onRequestClose={() => {
            let newPanelComment = { ...panelComment, isOpen: false };
            setPanelComment(newPanelComment);
          }}
          onSignin={(e)=>{
            setDialogLoginOpen(true);
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
          onComplete={(data)=>{
            console.log("onComplete :", data)

            props.login(data)
            setDialogLoginOpen(false);
          }}
          onClose={() => {
            setDialogLoginOpen(false);

            history.push("/")
          }}
        />
      )}

      {report.open && <ReportDialog 
                        open={report.open} 
                        postId={report.postId} 
                        onReport={(e)=>{
                          onCreateContactUs({ variables: { input: {
                                  userId: user.id,
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

      {dialogProfile.open &&  <DialogProfile 
                                open={dialogProfile.open} 
                                id={dialogProfile.id} 
                                onClose={()=>setDialogProfile({open: false, id:""})}/>
      }

      {
        !_.isEmpty(props.user)
        ? <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClick={(e)=>{
              history.push({
                pathname: "/post/new",
                state: {from: "/"},
              });
            }} />
        : <div />
      }
      
    </div>
  );
}

// export default Home; 

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
  }
};

const mapDispatchToProps = {
  login
}

export default connect( mapStateToProps, mapDispatchToProps )(Home);