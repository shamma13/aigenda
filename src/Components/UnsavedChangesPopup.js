import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import "./exitEditPopup.css";

const UnsavedChangesPopup = ({ open, onClose, onDiscard }) => {
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
        <strong style={{ fontSize: '18px' }}>Unsaved Changes</strong>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            textAlign: 'center', // Center text
            paddingTop: '10px',
          }}
        >
          You have unsaved changes. Are you sure you want to continue without saving?
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={onClose}>Cancel</Button>
          <Button variant="contained" className="discard-button" onClick={onDiscard}> Discard Changes</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default UnsavedChangesPopup;
