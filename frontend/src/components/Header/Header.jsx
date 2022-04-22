import React, {useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Avatar, InputBase, Toolbar, Typography, Container, AppBar, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { setLogout } from '../../redux/action';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 25),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledButton = styled(Button)({
  width: "5rem",
})


const Header = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchwine, setSearchwine] = useState('');
  const goToMain = () => {
    navigate(`/main`);
  };

  const goToProfile = () => {
    navigate(`/profile/${user.userId}`);
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(setLogout());
    navigate('/');
  };

  const login = () => {
    navigate('/');
  };

  const join = () => {
    navigate('/join');
  };
  
  const goSearch = () => {
    navigate(`/search/${searchwine}`);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      goSearch();
      setSearchwine("")
    }
  };

  const onsearchHandler = (event) => {
    setSearchwine(event.currentTarget.value);
  };

  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <AppBar position="static" sx={{backgroundColor: '#cd5c5c'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
          <Box sx={{ display: "flex" , flexDirection: "row"}}>
            <img src={require("../../assets/logo_w.png")} onClick={goToMain} style={{ width: "auto", height: "2.5rem", cursor: "pointer"}} alt="logo" />
            <Typography onClick={goToAbout} sx={{ marginLeft: "2rem", marginTop:"0.5rem", fontWeight: "normal", cursor: "pointer",}}>About</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row"}}>
            <Search>
              <StyledInputBase
                placeholder="와인 검색하기"
                inputProps={{ 'aria-label': 'search' }}
                value={searchwine}
                onChange={onsearchHandler}
                onKeyPress={handleKeyUp}
              />
            </Search>
            <ButtonBase onClick={goSearch}>
              <SearchIcon/>
            </ButtonBase>
            {
              user.userId ? 
              <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center", cursor: "pointer" }}>
                 {
                    user.userProfileUrl ?
                    <Avatar onClick={goToProfile} alt="profile" src={user.userProfileUrl} sx={{ mr: "10px", ml: "50px" }}/>:
                    <Avatar onClick={goToProfile} alt="profile" src={require("../../assets/default_profile.png")} sx={{ mr: "10px", ml: "50px" }}/> 
                  }
                <Typography onClick={goToProfile} style={{ marginRight: "1.1rem", fontSize: "1rem" }}>{user.userNickName}</Typography>
                <StyledButton color="inherit" onClick={logout}>로그아웃</StyledButton>
              </Box>
              : 
              <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center", fontSize: "1rem" }}>
                <StyledButton color="inherit" onClick={join} sx={{ ml: "40px" }}>회원가입</StyledButton>
                <StyledButton color="inherit" onClick={login}>로그인</StyledButton>
              </Box>
            }
          </Box>
         
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Header);