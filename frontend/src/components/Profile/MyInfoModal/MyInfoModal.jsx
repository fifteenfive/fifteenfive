import React, { useEffect, useState } from 'react';
import styles from './MyInfoModal.module.css';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Avatar, Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

const StyledButton = styled(Button)({
  backgroundColor: "#960018",
  color: "white",
  margin: "10px",
  padding: "5px 20px",
  "&:hover": {
    backgroundColor: "#8d0e23",
    boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)"
  }
})

const StyledAvatar = styled(Avatar)({
  width: "100px",
  height: "100px",
  margin: "15px 0 25px",
  boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)"
})

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "550px"
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export default function CustomizedDialogs({ open, userInfo, handleOpen, resign }) {
  const { userId } = useParams();
  const [nickName, setNickName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    if (open) {
      let token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.get(`/api/auth/users/${userId}/my-info`, config)
        .then((res) => {
          setNickName(res.data.userNickname);
          setPreviewImg(res.data.userProfileUrl);
        })
        .catch(err => console.log(err));
      setNickName(userInfo.nickName)
    }
  }, [open])

  // 프로필 이미지 수정
  const changeImage = (e) => {
    let reader = new FileReader();
    let image = e.target.files[0];
    
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    }
    setImageFile(image);
  };

  // 닉네임 수정
  const changeNickName = (e) => {
    setNickName(e.target.value);
  };

  const modifyInfo = () => {
    const formData = new FormData();
    formData.append('userProfileImg', imageFile); //첨부파일
    formData.append('userNickname', nickName);

    const token = localStorage.getItem('token');
    const url = `/api/auth/users/${userInfo.userId}/my-profile`;
    const config = {
      headers: { 
        Authorization: `Bearer ${token}`, 
        "Content-Type" : "multipart/form-data",
      },
    };

    axios.put(url, formData, config)
      .then(() => {
        handleOpen();
        window.location.reload();
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleOpen}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleOpen}>
          <p style={{ fontWeight: "bold", color: "#222" }}>개인정보 수정</p>
        </BootstrapDialogTitle>
        <DialogContent 
          dividers 
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div className={styles.profile_box}>
            <StyledAvatar src={previewImg}/>
            <div>
              <label htmlFor="image" className={styles.setting_icon}><SettingsIcon/></label>
              <input 
                type="file" 
                name="image" 
                id="image" 
                accept="image/png, image/jpeg, image/jpg" 
                style={{ display:"none" }}
                onChange={changeImage}
              />
            </div>
          </div>
          <div className={styles.input_row}>
            <label>이메일</label>
            <span style={{ width: "170px" }}>{userInfo.userEmail}</span>
          </div>
          <div className={styles.input_row}>
            <label>닉네임</label>
            <input type="text" value={nickName || ""} onChange={changeNickName}/>
          </div>
          <div className={styles.botton_box}>
            <StyledButton className={styles.modify_btn} autoFocus onClick={modifyInfo}>
              수정하기
            </StyledButton>
          </div>
          <p className={styles.resign} onClick={resign}>회원 탈퇴</p>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
