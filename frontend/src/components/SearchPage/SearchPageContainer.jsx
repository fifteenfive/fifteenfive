import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import Search from './SearchPagePresenter';

const SearchPageContainer = () => {
    const {searchwine} = useParams();
    const [searchdata, setSearchdata] = useState([]);
    useEffect(()=>{
        axios.get(`/api/wines/search/${searchwine}`)
        .then(function (response){
            console.log(response.data);  
            setSearchdata(response.data.result)          
        }).catch(function (error){
            console.log(error);
        })
      },[searchwine])
    return(
    <Search 
        searchwine = {searchwine}
        searchdata = {searchdata}/>
    );
}

export default SearchPageContainer;