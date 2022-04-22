
import { Grid, Button, Step, Stepper, StepLabel, Box, Fade } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ListWine from './ListWineCardPresenter';
import styles from './LifeStyleRecom.module.css';
import axios from 'axios';
import { connect } from "react-redux";
import { useState } from 'react';
import Loading from './Loading'



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

const steps = [
  "1",
  "2",
  "3"
];


const LifeStyleRecomPresenter=({ winelists , lifename, cntWishList, totalWishList,user })=>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onMain = () => {
    // 로딩 실행
    handleClickLoading();
    axios.get(`/api/connDjango/usercf/${user.userId}`)
    .then(function (response){
      // 로딩 종료
      handleClickLoading();
      navigate('/main');
    }).catch(function (error){
      console.log(error);
    })
  };

  const handleClickLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  return(
    <ThemeProvider theme={theme}>
      <Loading loading={loading}/>
      <Grid container 
        sx = {{ 
          height :'5vh', 
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          mt:'5%',
          mb:'3%',
        }}
      > 
        <h4 className={styles.title}>당신의 라이프스타일은 <span style={{ color: "#960018" }}>{lifename}</span>입니다</h4>
      </Grid>
      <p className={styles.subtitle} style={{ marginBottom: "10px" }}>위시리스트에 넣고 싶은 와인을 3개 이상 선택해주세요.</p>
      <p className={styles.subtitle}>위시리스트에 담은 와인을 기준으로 알맞은 추천을 해드립니다!</p>
      {/* 와인 선택 progress */}
      <Stepper activeStep={totalWishList} alternativeLabel sx={{ mt: "3%" }}>
        {steps.map((label) => (
          <Step key={label} sx={{ fontSize: "1.5rem" }}>
            <StepLabel sx={{ fontSize: "1.5rem" }}></StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid 
        container 
        spacing={3} 
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {
          winelists.map(wineList => (
            <ListWine wineList={wineList} cntWishList={cntWishList} key={wineList.wineId}/>
          ))
        }
      </Grid>
      <Grid container 
        sx = {{
                width: '100wh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: '5%',
                mb: '5%',
              }}>
        {
          totalWishList >= 3 && 
          <Button 
            type='submit'
            variant='contained'
            onClick={onMain}
            style={{ width: "30%"}}
          >
            완료
          </Button>
        }
      </Grid>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(LifeStyleRecomPresenter);
