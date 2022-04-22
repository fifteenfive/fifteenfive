import React from 'react';
import styles from './Loading.module.css';
import { styled } from '@mui/material/styles';
import { Dialog, DialogContent } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  position: "fixed",
  top: "-5%",
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    color: "#222",
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "24rem",
    height: "10rem",
    borderRadius: "20px", 
    backgroundColor: "#ffffffed",
  },
}));


export default function LoadingDialogs({ loading }) {
  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={loading}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <DialogContent 
          dividers 
          sx={{ display: "flex", flexDirection: "row", alignItems: "center", }}
        >
          <div style={{ margin: "20px 20px 20px 30px"}} className={styles.lds_spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          <div className={styles.phrase}>
            <p style={{ margin: "0px 0 10px" }}>취향에 맞는 와인 추천 중...</p>
            <p>잠시만 기다려주세요</p>
          </div>
          
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
