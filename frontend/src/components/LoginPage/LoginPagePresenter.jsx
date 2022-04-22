import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { CssBaseline, Grid, Box , TextField, Button} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Screen from './Login.svg';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../redux/action';
import styles from'./LoginPage.module.css';

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

const LoginPagePresenter = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onLogin = (event) => {
        event.preventDefault();
        axios.post('/api/users/sign-in', {
            userEmail:email,
            userPassword:password,
        })
        .then(function (response){
            console.log("성공");
            console.log(response.data);
            const data = response.data;
            localStorage.setItem('token', data.token);
            // redux
            props.dispatch(setUser({userId: data.userId, userNickName: data.userNickName, userProfileUrl: data.userProfileUrl}))

            console.log(response.data.token);
            console.log(response.data.userLifestyleCode);
            if(response.data.userLifestyleCode === null){
                navigate('/lifestyle', {
                    state:{
                        data : response.data,
                    }
                })
            }
            else{
                navigate('/main')
            }
        })
        .catch(function (error){
            console.log(error);
        });
    }

    const onClick = () => {
        navigate('/join');
    }

    
    return (
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx = {{height :'93vh', width: '100vw',}}>
            <CssBaseline/>
            <Grid item
                xs = {false}
                sm = {8}
                md = {4}
                sx = {{
                    backgroundImage : `url('${Screen}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}/>
            <Grid item
                xs = {12}
                sm = {8}
                md = {8}
                elevation = {6}
                sx = {{
                    backgroundColor: '#ffffff',
                }}
                >
                <Box boxShadow = '3'
                    sx = {{
                        mt:'7%',
                        ml:'21%',
                        height:'80%',
                        width: '55%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                    }}
                >
                    <h1 className={styles.h1}>
                        Welcome Back
                    </h1>
                    <hr className={styles.underline}></hr>

                    <span className={styles.engfont}>
                        Login with email
                    </span>

                    <Box component="form" noValidate  sx ={{ mt:6, width: '60%'}}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete='email'
                            autoFocus
                            onChange={onEmailHandler}
                            value={email}
                        />
                        <TextField
                            margin = "normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete='current-password'
                            type = "password"
                            onChange={onPasswordHandler}
                            value={password}
                        />
                        <Button
                            size = 'large'
                            type='submit'
                            variant='contained'
                            fullWidth
                            onClick = {onLogin}
                            sx={{
                                mt:4,
                                mb:1,
                                }}>
                            로그인
                        </Button>
                        <Button
                            size = 'large'
                            type='submit'
                            variant='outlined'
                            fullWidth
                            color='secondary'
                            onClick = {onClick}
                            sx={{
                                mt:1,
                                mb:2, 
                                }}>
                            회원가입
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    );
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(LoginPagePresenter);