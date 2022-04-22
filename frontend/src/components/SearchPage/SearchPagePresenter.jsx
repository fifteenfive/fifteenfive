import React, { useState } from "react";
import {Grid, Typography, Button, TextField, Box} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import SearchList from './SearchCardPresenter';

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

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const SearchPagePresenter = ({searchwine, searchdata}) => {
  const [search,setSearch] = useState();
  const onsearchHandler = (event) =>{
    setSearch(event.currentTarget.value);
  };

  const onsearchClick = () =>{
    window.location.replace(`/search/${search}`);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      onsearchClick();
    }
  };

  return(
    <ThemeProvider theme={theme}>
      <div>
        <Grid container 
          sx = {{ height: '5vh', 
                  width: '100vw',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mt:'6%',
        }}>
          <Typography variant="h3" component="h3" sx={{ fontSize: "2.0rem", fontWeight: "bold", color: "#222" }}>와인 검색</Typography>
        </Grid>
        <Box sx = {{ flexGrow:1, mb:'2%', justifyContent: "center", display: "flex" }}>
          <Grid container spacing={2}
            sx = {{
              width: "100%",
              mt:'5%',
              justifyContent: "center",
            }}>
              <TextField sx={{ width:'600px', mr: "2rem" }}  
              label={searchwine} id="search" size = "small" 
              onChange = {onsearchHandler}
              onKeyPress={handleKeyUp}/>
              <Button 
                color="secondary" 
                variant='contained'
                onClick={onsearchClick}
                sx={{ width: "100px" }}>
                검색
              </Button>
          </Grid>
        </Box>
        <Grid container  spacing={2}
          sx = {{
                  width: '80wh',
                  display: 'flex',
                  justifyContent: 'center',
                  mb: "5%"
                }}>
                {searchdata.map(wineList => (
                  <SearchList wineList={wineList} key={wineList.wineId}/>
              ))}
        </Grid>
      </div>
    </ThemeProvider>
  );
}
export default SearchPagePresenter;