import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const index =({open, portId, onClose})=> {
//   const [open, setOpen] = useState(isOpen);

//   useEffect(()=>{
//     console.log(">>>>>>> ", open)
//   },[open])

  const handleClickOpen = () => {
    // setOpen(true);

    onClose()
  };

  const handleClose = () => {
    // setOpen(false);

    onClose()
  };

  return (
      <Dialog open={open}>
        <DialogTitle>REPORT {portId}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
          REPORT
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="message"
            // type="email"
            fullWidth
            variant="standard"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
          <Button onClick={handleClose}>REPORT</Button>
        </DialogActions>
      </Dialog>
  );
}

export default index 