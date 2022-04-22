import axios from 'axios';
import Main from './MainPagePresenter';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MainPageContainer = ({loginedUser}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const lifestyleCode = [
    {  
      id : 'LT01',
      name : '건강추구형',
      color: "#EFA189"
    },
    {
      id : 'LT02',
      name : '유행추구형',
      color: "#c44f4f"
    },
    {
      id : 'LT03',
      name : '사회성추구형',
      color: "rgb(231 79 31)"
    },
    {
      id : 'LT04',
      name : '합리성추구형',
      color: "#CD5C5C"
    },
  ];

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
    const [userInfocode, setUserInfocode] = useState([]);

    const [redwine, setRedwine] = useState([]);
    const [whitewine, setWhitewine] = useState([]);
    const [itemcfwine, setItemcfwine] = useState([]);
    const [usercfwine, setUsercfwine] = useState([]);
    const [lifestylewine, setLifestylewine] = useState([]);
    const [lifestylecodewine, setLifestylecodewine] = useState([]);
    useEffect(()=>{
      window.scrollTo(0, 0);
      
      axios.get(`/api/auth/users/${loginedUser.userId}/my-info`,config)
      .then(function (response){
          console.log(response.data.userLifestyleCode);
          for (var i in lifestyleCode) {
            if (response.data.userLifestyleCode === lifestyleCode[i].id) {
              setUserInfocode(lifestyleCode[i].name);
            }
          };
      }).catch(function (error){
          console.log(error);
      })
    },[])

    useEffect(()=>{
        axios.get(`/api/rank/red`).then(function (response){
            setRedwine(response.data.레드);
        }).catch(function (error){
            console.log("실패");
        })
    },[])
    useEffect(()=>{
      axios.get(`/api/rank/white`).then(function (response){
          setWhitewine(response.data.화이트);
      }).catch(function (error){
          console.log("실패");
      })
    },[])
    useEffect(()=>{
        axios.get(`/api/recommends/usercf`,config)
        .then(function (response){
            setUsercfwine(response.data.result);
        }).catch(function (error){
            console.log(error);
        })
    },[])
    useEffect(()=>{
      axios.get(`/api/recommends/itemcf/${loginedUser.userId}`,config)
      .then(function (response){
          console.log(response.data.result);
          setItemcfwine(response.data.result);
      }).catch(function (error){
          console.log(error);
      })
  },[])
    useEffect(()=>{
      axios.get(`/api/recommends/lifestyle-main`,config)
      .then(function (response){
          setLifestylewine(response.data.result);
      }).catch(function (error){
          console.log(error);
      })
    },[])
    useEffect(()=>{
      axios.get(`/api/recommends/lifestyle-same`,config)
      .then(function (response){
          setLifestylecodewine(response.data.result);
          
      }).catch(function (error){
          console.log(error);
      })
    },[]);

    const goToLogin = () => {
      navigate('/');
    };

    return(
        <Main
        userInfocode = {userInfocode}
        redwine = {redwine}
        whitewine = {whitewine}
        usercfwine={usercfwine}
        itemcfwine={itemcfwine}
        lifestylewine={lifestylewine}
        lifestylecodewine={lifestylecodewine}
        goToLogin={goToLogin}/>
    );
}
const mapStateToProps = (state) => {
    return {
      loginedUser: state.user
    }
  }
  export default connect(mapStateToProps)(MainPageContainer);
// export default MainPageContainer;