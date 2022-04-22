import * as React from 'react';
import {Grid, Typography,Box , Container } from '@mui/material';
import {styled} from '@mui/material/styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import Screen from './main.png';
import mainImg from '../../assets/main.jpg';
import costyled from "styled-components";
import MainCard from "./MainCardPresenter";
import styles from "./MainPage.module.css";
import clsx from "clsx";
import { connect } from "react-redux"
import { relativeTimeRounding } from 'moment';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const settings = {
    dots: false,
    inFinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
}

const Styled_Slide = costyled(Slider)`
    margin-Top: 20px;
    .slick-prev:before, .slick-next:before {
        font-family:'slick';
        opacity: .75;
        color: #000000;
    }
`;

const StyledTypography = styled(Typography)({
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#222",
});


const MainPagePresenter = ({ user, userInfocode, redwine, whitewine, usercfwine, itemcfwine,lifestylewine,lifestylecodewine, goToLogin}) => {

  return (
   <Grid container className={clsx(styles.engfont, styles.korfont)} sx ={{ backgroundColor: '#FDF9F9', }}>
        <Box  
            sx = {{ 
                    mb:'5%',
                    width: '100vw',
                    height: '15rem',
                    backgroundImage : `url('${mainImg}')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
            }}
        />
        {
           user.userId &&
            <Grid container 
                sx = {{
                        display: 'flex',
                        justifyContent: 'left',
                        marginLeft: '10.5vw'
                    }}>
                <StyledTypography className={styles.title}>
                    <span style={{color: '#BE3B3A'}}>{user.userNickName}</span>님과 비슷한 취향의 유저가 좋아하는 와인
                </StyledTypography>
            </Grid>
       }
       {
           user.userId &&
            <Grid item xs = {12}
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: '7%'
                }}>
                <Box sx = {{
                    height:'350px',
                    width: '80%',
                    // backgroundColor: '#ffffff'
                    // backgroundColor:'#000000',
                }}>
                    <Styled_Slide {...settings}>
                    {usercfwine.map(wine => (
                            <MainCard wine = {wine} key = {wine.wineId}/>
                        ))}
                    </Styled_Slide>
                </Box>
            </Grid> 
       }
        {
            user.userId &&
            <Grid container 
                sx = {{
                        display: 'flex',
                        justifyContent: 'left',
                        marginLeft: '10.5vw'
                    }}>
                <StyledTypography className={styles.title}>
                <span style={{color: '#BE3B3A'}}>{user.userNickName}</span>님과 같은 라이프스타일의 유저들이 높은 평점을 준 와인
                </StyledTypography>
            </Grid>
        }
        {
            user.userId &&
            <Grid item xs = {12}
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: '7%'
                }}>
                <Box sx = {{
                    height:'350px',
                    width: '80%',
                    // backgroundColor: '#ffffff'
                    // backgroundColor:'#000000',
                }}>
                    <Styled_Slide {...settings}>
                    {lifestylecodewine.map(wine => (
                            <MainCard wine = {wine} key = {wine.wineId}/>
                    ))}
                    </Styled_Slide>
                </Box>
            </Grid> 
        }
        {
            user.userId && 
            <Grid container 
                sx = {{
                        display: 'flex',
                        justifyContent: 'left',
                        marginLeft: '10.5vw'
                    }}>
                <StyledTypography className={styles.title}>
                    <span style={{color: '#BE3B3A'}}>{user.userNickName}</span>님이 좋아하는 와인과 유사한 와인
                </StyledTypography>
            </Grid>
        }
        {
            user.userId &&
            <Grid item xs = {12}
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: '7%'
                }}>
                <Box sx = {{
                
                    height:'350px',
                    width: '80%',
                    // backgroundColor: '#ffffff'
                    // backgroundColor:'#000000',
                }}>
                    <Styled_Slide {...settings}>
                    {itemcfwine.map(wine => (
                            <MainCard wine = {wine} key = {wine.wineId}/>
                        ))}
                    </Styled_Slide>
                </Box>
            </Grid> 
        }
        {
            user.userId && 
            <Grid container 
                sx = {{
                        display: 'flex',
                        justifyContent: 'left',
                        marginLeft: '10.5vw'
                    }}>
                <StyledTypography className={styles.title}>
                            <span style={{color: '#960018'}}>#{userInfocode}</span>에 어울리는 와인
                </StyledTypography>
            </Grid>
        }
        {
            user.userId && 
            <Grid item xs = {12}
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: '7%'
                }}>
                <Box sx = {{
                    height:'350px',
                    width: '80%',
                    // backgroundColor: '#ffffff'
                    // backgroundColor:'#000000',
                }}>
                    <Styled_Slide {...settings}>
                    {lifestylewine.map(wine => (
                            <MainCard wine = {wine} key = {wine.wineId}/>
                        ))}
                    </Styled_Slide>
                </Box>
            </Grid>
        }
        {/* 기본 제공 */}
        <Grid container 
            sx = {{
                    display: 'flex',
                    justifyContent: 'left',
                    marginLeft: '10.5vw'
                }}>
            <StyledTypography className={styles.title} sx={{ fontSize: "1.8rem" }}>
                        Red Wine TOP 10
            </StyledTypography>
            <Typography className={styles.subtitle} sx={{padding: '0.6rem 1.2rem 0'}}>
                        가장 높은 평점을 받은 레드와인입니다.
            </Typography>
        </Grid>
        <Grid item xs = {12} sx = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: '7%'
            }}>

        <Box sx = {{
                height:'350px',
                width: '80%',
            }}>
                <Styled_Slide {...settings}>
                    {redwine.map(wine => (
                        <MainCard wine = {wine} key = {wine.wineId}/>
                    ))}
                </Styled_Slide>
            </Box>
        </Grid>
        <Grid container 
            sx = {{
                    display: 'flex',
                    justifyContent: 'left',
                    marginLeft: '10.5vw'
                }}>
            <StyledTypography className={styles.title} sx={{ fontSize: "1.8rem"}}>
                        White Wine TOP 10
            </StyledTypography>
            <Typography className={styles.subtitle} sx={{padding: '0.6rem 1.2rem 0'}}>
                        가장 높은 평점을 받은 화이트와인입니다.
            </Typography>
        </Grid>
        <Grid item xs = {12}
            sx = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: '4%'
            }}>
            <Box sx = {{
                height:'350px',
                width: '80%',
                mb: '5%',
                cursor: 'pointer',
                // backgroundColor:'#000000',
            }}>
                <Styled_Slide {...settings}>
                {whitewine.map(wine => (
                        <MainCard wine = {wine} key = {wine.wineId}/>
                    ))}
                </Styled_Slide>
            </Box>
        </Grid>
        {
            !user.userId &&
            <div className={styles.guide}>
                <span onClick={goToLogin}>로그인</span>하시면 더 다양한 추천을 받으실 수 있습니다 
            </div>
        }
    </Grid>
  );
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }
  
  export default connect(mapStateToProps)(MainPagePresenter);
