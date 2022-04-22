import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import MyReviews from './MyReviews/MyReviewsContainer';
import WishList from './WishList/WishListContainer';
import Fridge from './Fridge/FridgeContainer';
import MyInfoModal from './MyInfoModal/MyInfoModal';
import { styled } from '@mui/material/styles';
import { Avatar, Chip, Box, Tab, requirePropFactory } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import Swal from 'sweetalert2';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { setLogout } from '../../redux/action';

const StyledAvatar = styled(Avatar)({
  width: "9rem",
  height: "9rem",
  marginLeft: "30px",
  boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)"
})

const StyledTab = styled(Tab)({
  margin: "7px 20px 0", 
  fontSize: "16px",
  fontWeight: "600",
  color: "#222",
  width: "28%",
  "&:hover": {
    color: "#CD5C5C",
    backgroundColor: "white",
  },
  "&.Mui-selected": {
    color: "#CD5C5C",
  }
})


const ProfilePage = ({ user, lifestyle, loginedUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // 개인정보 수정 모달창 조절
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const checkResign = () => {
    handleOpen();
    Swal.fire({
      title: '정말로 탈퇴하시겠습니까?',
      text: '탈퇴 시 회원님의 모든 정보는 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '회원탈퇴',
      cancelButtonText: '취소',
      input: 'password',
      inputPlaceholder: '비밀번호를 입력해주세요',
      inputAttributes: {
        maxlength: 25,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    }).then((res) => {
      if (res.isConfirmed) {
        deleteUser(res.value);
      }
    })
  }

  const checkPassword = () => {
    Swal.fire({
      title: '정말로 탈퇴하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2F80ED',
      cancelButtonColor: 'red',
      confirmButtonText: '회원탈퇴',
      cancelButtonText: '취소',
      input: 'password',
      text: '비밀번호가 틀렸습니다. 다시 입력해주세요.',
      inputPlaceholder: '비밀번호를 입력해주세요',
      inputAttributes: {
        maxlength: 25,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    })
    .then((res) => {
      if (res.isConfirmed) {
        deleteUser(res.value);
      }
    })
  }

  const deleteUser = (password) => {
    const url = `/api/users/${userId}`;
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    return axios.delete(url, {
      data: { password: password },
      config
    })
      .then(() => {
        localStorage.removeItem('token');
        dispatch(setLogout());
        navigate('/');
      })
      .catch(err => {
        if (err.response.status === 400) {
          checkPassword();
        } else {
          navigate(`/`);
        };
      });
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {
          user.userProfileUrl ?
          <StyledAvatar alt="profile" src={user.userProfileUrl}/> :
          <StyledAvatar alt="profile" src={require("../../assets/default_profile.png")}/> 
        }
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={styles.lifestyle} style={{ color: lifestyle.color }}># {lifestyle.name}</p>
            <p className={styles.nickname}>{user.userNickname} 님</p> 
          </div>
          {
            userId == loginedUser.userId &&
            <Chip 
              label="개인정보 수정"
              sx={{ 
                margin: "15px 0 0 35px",
                width: "100px", 
                height: "25px",
              }} 
              onClick={handleOpen} 
            />
          }
        </div>
      </div>
      <Box sx={{ 
        width: "100%", 
        boxShadow: "0 0 8px 0 rgba(192, 197, 233, 0.6)"
        }}
      >
        <TabContext value={value}>
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: "divider", 
            display: "flex",
            justifyContent: "center",
            height: "60px",
            alignItems: "center",
            }}
          >
            <TabList 
              onChange={handleTabChange} 
              aria-label="lab API tabs example" 
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#BE3B3A"
                 }
              }}
              sx={{ width: "60%", height: "60px" }} 
            >
              <StyledTab label="와인냉장고" value="1" />
              <StyledTab label="내 리뷰목록" value="2" />
              <StyledTab label="위시리스트" value="3" />
            </TabList>
          </Box>
          <Box>
            <TabPanel value="1" sx={{ padding: "0" }}>
              <Fridge />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "0px 0", position: "relative" }}>
              <MyReviews/>
            </TabPanel>
            <TabPanel value="3" sx={{ padding: "0px 0" }}>
              <WishList />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
      {/* 모달창 */}
      <MyInfoModal userInfo={user} open={open} handleOpen={handleOpen} resign={checkResign}/>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    loginedUser: state.user
  }
}

export default connect(mapStateToProps)(ProfilePage);