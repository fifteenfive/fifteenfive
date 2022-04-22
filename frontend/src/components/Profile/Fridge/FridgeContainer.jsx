import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Fridge from "./FridgePresenter";
import axios from "axios";

const FridgeContainer = () => {
  const { userId } = useParams();

  useEffect(() => {
    axios.get(`/api/mypage/${userId}/celler`)
      .then((res) => {
        setWines(res.data.result);
      })
      .catch(err => console.log(err))
  }, []);


  const [wines, setWines] = useState([]);

  return (
    <Fridge wines={wines}/>
  )
};

export default FridgeContainer;