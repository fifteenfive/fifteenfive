import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { CssBaseline, Grid, Box, TextField, Button, FormControlLabel, Checkbox} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Screen from './join.svg'
import axios from 'axios';
import styles from'./JoinPage.module.css';


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

const JoinPagePresenter = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [duplicatedcheck, setDuplicatedCheck] = useState();
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
        
    }
    const onNickNameHandler = (event) =>{
        setNickname(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPassword = (event) => {
        setConfirmPassword(event.currentTarget.value);
        
    }
    const onEmailCheckHandler = () =>{
        if(email === ""){
            return alert('이메일을 입력하세요');
        }
        else{
            axios.get(`/api/users/check_email/${email}`)
            .then(function (response){
            console.log(response);
            setDuplicatedCheck(true);
            return alert('사용 가능한 이메일입니다.');
            }).catch(function(error){
            console.log(error);
            setDuplicatedCheck(false);
            return alert('이미 등록된 이메일이 있습니다.');
            })
        }
    }

    const onPost = (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야합니다.');
        }
        else if(!duplicatedcheck){
            return alert('이메일을 다시 입력하세요');
        }
        else{
            axios.post("/api/users/sign-up",{
                userEmail: email,
                userLifestyleCode: null,
                userNickname: nickname,
                userPassword: password,
                userProfileUrl: null,
            })
            .then(function (response){
                console.log("전송");
                navigate('/');
            }).catch(function (error){
                console.log(error);
            })
            
        }
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
                        borderRadius: 2
                    }}
                >
                    <h1 className={styles.h1}>
                        Create your Account
                    </h1>

                    <hr className={styles.underline}></hr>
                    
                    <Box component="form" noValidate  sx ={{ mt:2, width: '70%',}}>
                        <Grid container spacing={1}>
                            <Grid item xs={9}>
                                <TextField
                                    size="small"
                                    margin = "normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete='email'
                                    autoFocus
                                    onChange={onEmailHandler}
                                    value={email}
                                    sx ={{ mb:0,}}
                                />
                            </Grid>
                            <Grid item xs={3} sx={{
                                display:'flex',
                                alignItems:'center'}}>
                                <Button
                                    required
                                    fullWidth
                                    variant="outlined"
                                    margin = "1rem"
                                    type='button'
                                    onClick={onEmailCheckHandler}
                                    sx={{mt:'15%',
                                height:'70%'}}
                                >중복확인</Button>
                            </Grid>
                        </Grid>
                        
                        <TextField
                            size="small"
                            margin = "normal"
                            required
                            fullWidth
                            id="nickname"
                            label="Nickname"
                            name="nickname"
                            autoComplete='nickname'
                            type = "nickname"
                            onChange={onNickNameHandler}
                            value={nickname}
                            sx ={{ mb:0,}}
                        />
                        <TextField
                            size="small"
                            margin = "normal"
                            required
                            fullWidth
                            id="password"
                            label="비밀번호"
                            name="password"
                            autoComplete='password'
                            type = "password"
                            onChange={onPasswordHandler}
                            value={password}
                            sx ={{ mb:0,}}
                        />
                        <TextField
                            size="small"
                            margin = "normal"
                            required
                            fullWidth
                            id="repassword"
                            label="비밀번호 재입력"
                            name="repassword"
                            autoComplete='repassword'
                            type = "password"
                            onChange={onConfirmPassword}
                            value={confirmPassword}
                            sx ={{ mb:1,}}
                        />
                        <Box
                            sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            }}
                        >
                        <FormControlLabel
                            sx ={{ mb:5,
                            mr:0}}
                            control = {<Checkbox value="check" color= "primary" sx ={{ mb:0.5,}}/>}
                            label="개인정보 수집 동의"
                        />
                        </Box>
                        <Button
                            margin = "normal"
                            size = 'large'
                            fullWidth
                            type='submit'
                            variant='contained'
                            onClick = {onPost}
                            sx={{
                                mt:0,
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
export default JoinPagePresenter;