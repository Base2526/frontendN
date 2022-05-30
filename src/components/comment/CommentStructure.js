import React, { useContext, useState } from 'react'
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'
import { makeStyles } from '@material-ui/core/styles';

import { ActionContext } from './ActionContext'

const useStyles = makeStyles({
  link: {
    // color: 'white',
    position: 'relative',
    "&:hover:not(.Mui-disabled)": {
      cursor: "pointer",
      border: "none",
      color: "gray"
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '2px',
      bottom: '-3px',
      left: '50%',
      transform: 'translate(-50%,0%)',
      // backgroundColor: 'red',
      visibility: 'hidden',
      transition: 'all 0.3s ease-in-out',
    },
    '&:hover:before': {
      visibility: 'visible',
      width: '100%',
    },
  },
});

const CommentStructure = ({ i, reply, parentId }) => {

  const classes = useStyles();

  const actions = useContext(ActionContext)
  const edit = true

  const [anchorEl, setAnchorEl] = useState(null);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (event, reason) => {
    setOpenDialog(false);
  };

  const handleAnchorOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = (event) => {
    setAnchorEl(null);
  };

  const dialogDelete = () =>{
    return  <Dialog
              open={openDialog}
              // onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Delete Comment
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Delete your comment permanently?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {/* <Button  variant="outlined" onClick={()=>{
                  handleCloseDialog()
                  actions.onDelete(i.comId, parentId)
                }} autoFocus>
                  Delete
                </Button> */}

                <Button variant="outlined"  onClick={()=>{
                  handleCloseDialog()
                  actions.onDelete(i.comId, parentId)
                }} startIcon={<DeleteIcon />}>
                  Delete
                </Button>
                <Button variant="contained" onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </Dialog>
  }

  return (
    <div className={"halfDiv"}>
      <div
        className={"userInfo"}
        style={reply && { marginLeft: 15, marginTop: '6px' }}
      >
        <div className={"commentsTwo"}>
          <Avatar className={classes.link} src={i.avatarUrl} sx={{ width: 24, height: 24 }} alt="userIcon" />
          <Typography className={classes.link} variant="subtitle2" gutterBottom component="div">{i.fullName}</Typography>
          
          <IconButton aria-label="reply" className={"replyBtn"}
            onClick={() => actions.handleAction(i.comId)}
            disabled={!actions.user}>
            <ReplyIcon
              
            />Reply
          </IconButton>
        </div>
        <Typography variant="subtitle1" gutterBottom component="div">{i.text} </Typography>
      </div>
      <div className={"userActions"}>
        {actions.userId === i.userId && actions.user && (
           <IconButton aria-label="share">
           <MoreVertIcon
             onClick={handleAnchorOpen}
           />
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={
                Boolean(anchorEl)
              }
              onClose={handleAnchorClose}
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
              <MenuItem onClick={()=>{
                actions.handleAction(i.comId, edit)
                handleAnchorClose()
              }}>
                Edit
              </MenuItem>
              <MenuItem onClick={(ev)=>{
                // actions.handleAction(i.comId, edit)
                handleClickOpenDialog(ev)
                handleAnchorClose()
              }}>
                Delete
              </MenuItem>
            </Menu>
            
            {dialogDelete()}
           </IconButton>
        )}
      </div>
    </div>
  )
}

export default CommentStructure
