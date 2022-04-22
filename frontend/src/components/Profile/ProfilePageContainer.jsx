import React, { useEffect, useState } from "react";
import Profile from "./ProfilePagePresenter";
import { useParams } from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import { setUser } from '../../redux/action';

const ProfilePageContainer = ( props ) => {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [userLifestyle, setUserLifestyle] = useState({});
  const lifestyleCode = [
    {  
      id : 'LT01',
      name : '건강추구형',
      color: "#EFA189"
    },
    {
      id : 'LT02',
      name : '유행 추구형',
      color: "#c44f4f"
    },
    {
      id : 'LT03',
      name : '사회성 추구형',
      color: "#cb461c"
    },
    {
      id : 'LT04',
      name : '합리성 추구형',
      color: "#CD5C5C"
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 유저 정보 불러오기
    let token = localStorage.getItem('token');
    const url = `/api/auth/users/${userId}/my-info`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.get(url, config)
      .then(res => {
        const data = res.data;
        setProfileUser(data);
        
        // 유저의 라이프스타일 코드 저장
        for (var i in lifestyleCode) {
          if (data.userLifestyleCode === lifestyleCode[i].id) {
            setUserLifestyle(lifestyleCode[i]);
          }
        };

        // 프로필 페이지와 유저의 id가 다른 경우
        if (props.user.userId == userId) { 
          if (props.user.userNickName != data.userNickname || props.user.userProfileUrl != data.userProfileUrl) {
            props.dispatch(setUser({ 
              userId: data.userId, 
              userNickName: data.userNickname, 
              userProfileUrl: data.userProfileUrl
            }));
          }  
        }
      })
      .catch(err => console.log(err));
  }, [userId]);

  return (
    <Profile user={profileUser} lifestyle={userLifestyle}/>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ProfilePageContainer);