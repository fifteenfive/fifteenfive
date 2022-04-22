import React, { useState } from "react";
import styles from './LifeStylePage.module.css';
import {Grid, ButtonBase, Container, Button} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

import well_beingImg from '../../assets/lifestyleImg/well_being.jpeg';
import fashionImg from '../../assets/lifestyleImg/fashion.jpeg';
import socialImg from '../../assets/lifestyleImg/social.jpeg';
import reasonImg from '../../assets/lifestyleImg/reason.jpeg';


const theme = createTheme({
    palette: {
        primary: {
            light:'#F97272',
            main: '#cd5c5c',
            dark: '#AB3A3A',
            contrastText:'#fff',
        },
        secondary:{
            light:'',
            main:'#000000',
            dark:'e5e5e5',
            contrastText:'#fff'
        }
    },
});

const LifeStylePagePresenter = ({loginedUser}) =>{
    
    const [LifeStyle, setLifeStyle] = useState();
    const navigate = useNavigate();
    const [Explain, setExplain] = useState([
        {
            id : 'LT01',
            name : '건강추구형',
            ex : '건강한 생활에 관심이 많고 웰빙 제품을 즐겨 소비',
        },
        {
            id : 'LT02',
            name : '유행 추구형',
            ex : '유행에 민감하고 쇼핑을 즐김',
        },
        {
            id : 'LT03',
            name : '사회성 추구형',
            ex : '사회적 역할과 소속감을 중요하게 생각하고 타인과 관계유지를 위한 소비를 함',
        },
        {
            id : 'LT04',
            name : '합리성 추구형',
            ex : '계획적인 소비, 실리적인 소비를 하고 충동구매를 잘 하지 않음',
        },
    ])
    
    const onLifestyleHandler = (event) => {
        event.preventDefault();
        console.log(event.currentTarget.value);
        setLifeStyle(event.currentTarget.value);
        // console.log(location.state.data.userLifestyleCode);
    }
    const token = localStorage.getItem('token');
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    const onRecomLifestyleHandler = () => {
        // /auth/users/56?userLifeStyleCode=LT04",
        axios.put(`/api/auth/users/${loginedUser.userId}?userLifeStyleCode=${Explain[LifeStyle].id}`,
        {params :{userLifeStyleCode: Explain[LifeStyle].id}}
          ,config)
          .then(function(response){
            console.log(response);
            console.log("성공")
          }).catch(function (error){
            console.log(error);
          });
        navigate(`./recom/${Explain[LifeStyle].id}`);
    }

    return(
        <Container sx = {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center',
        }}>
        <Container  sx ={{ mt:'2%', mb:'3%', textAlign: 'center'}}>
            <h5 className={styles.h5_font}>당신의 <span style={{color: '#AB3A3A'}}>라이프스타일</span>을 선택해주세요!</h5>
            <p className={styles.font_gray}>라이프스타일을 선택하면 그에 맞는 와인을 추천해드립니다</p>
        </Container>

        <Container  sx ={{ flexGrow:1, mb:'1%' }}>
            <Grid container spacing={2} sx={{padding: '0 8%'}}>
                <Grid item xs={6} sx = {{mb: '2%', display:'flex', justifyContent: 'center'}}>
                    <ButtonBase 
                      value={0}
											onClick ={onLifestyleHandler}
											className={styles.image_container}
											style={{backgroundImage: `url(${well_beingImg})`}}
											sx={{
												boxShadow: LifeStyle == 0 ? "0px 0px 20px 10px #ce7373" : "0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);",
											}}
										>
											<div className={styles.bg_dark} style={{opacity: LifeStyle == 0 ? 1 : 0}}>
													<h3>건강 추구형🌿</h3>
													<p>삶의 목표는 건강한 생활!</p>
													<p>웰빙 제품을 즐겨 소비해요!</p>
											</div>
                    </ButtonBase>
                </Grid>
                <Grid item xs={6} sx = {{mb: '2%', display:'flex', justifyContent: 'center'}}>
										<ButtonBase 
                      value={1}
											onClick ={onLifestyleHandler}
											className={styles.image_container}
											style={{backgroundImage: `url(${fashionImg})`}}
											sx={{
												boxShadow: LifeStyle == 1 ? "0px 0px 20px 10px #ce7373" : "0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);",
											}}
										>
                        <div className={styles.bg_dark} style={{opacity: LifeStyle == 1 ? 1 : 0}}>
                            <h3>유행 추구형✨</h3>
                            <p>제 이미지를 표현하는걸 좋아해요</p>
														<p>유행에 민감하고 쇼핑도 좋아해요!</p>
                        </div>
                    </ButtonBase>
                </Grid>
                <Grid item xs={6} sx = {{mb: '2%', display:'flex', justifyContent: 'center'}}>
										<ButtonBase 
                      value={2}
											onClick ={onLifestyleHandler}
											className={styles.image_container}
											style={{backgroundImage: `url(${socialImg})`}}
											sx={{
												boxShadow: LifeStyle == 2 ? "0px 0px 20px 10px #ce7373" : "0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);",
											}}
										>
                        <div className={styles.bg_dark} style={{opacity: LifeStyle == 2 ? 1 : 0}}>
                            <h3>사회성 추구형👭</h3>
                            <p>사회적 인정과 존경받는걸 좋아해요</p>
														<p>원만한 관계유지를 위한 소비는 OK!</p>
                        </div>
                    </ButtonBase>
                </Grid>
                <Grid item xs={6} sx = {{mb: '2%', display:'flex', justifyContent: 'center'}}>
										<ButtonBase 
                      value={3}
											onClick ={onLifestyleHandler}
											className={styles.image_container}
											style={{backgroundImage: `url(${reasonImg})`}}
											sx={{
												boxShadow: LifeStyle == 3 ? "0px 0px 20px 10px #ce7373" : "0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);",
											}}
										>
                        <div className={styles.bg_dark} style={{opacity: LifeStyle == 3 ? 1 : 0}}>
                            <h3>합리성 추구형⚖️</h3>
                            <p>계획적으로 소비해요!</p>
														<p>충동구매는 잘 하지 않고 현실적인 편이에요</p>
                        </div>
                    </ButtonBase>
                </Grid>
            </Grid>
        </Container>
        
        <ThemeProvider theme={theme}>
            <Container sx ={{ flexGrow:1, mb:'5%' }}>
                <Grid item xs = {12} sx ={{ display:'flex', justifyContent:'center'}}>
                    <Button
                        variant='contained'
                        margin = "normal"
                        onClick = {onRecomLifestyleHandler} 
                    >완료</Button>
                </Grid>
            </Container>
        </ThemeProvider>
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
      loginedUser: state.user
    }
  }
export default connect(mapStateToProps)(LifeStylePagePresenter);
