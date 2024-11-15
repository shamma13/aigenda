
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import "./exitEditPopup.css";

const DeleteTaskPopup = ({ open, onClose, onDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '20px', // Rounded corners
          width: '400px', // More square look
        },
      }}
    >
      <DialogTitle style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Circular Warning Icon */}
        <div
        >
          <ErrorOutlineIcon style={{ color: 'red', fontSize: '40px' }} />
        </div>
        <strong style={{ fontSize: '18px' }}>Delete Task</strong>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            textAlign: 'center', // Center text
            paddingTop: '10px',
          }}
        >
          Are you sure you want to delete this task?
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onDelete} className="discard-button"> Delete </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskPopup;
