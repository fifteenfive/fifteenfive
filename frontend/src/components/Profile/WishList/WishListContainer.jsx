import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WishList from "./WishListPresenter";
import axios from "axios";

const WishListContainer = () => {
  const { userId } = useParams();
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    getMyWishList();
  }, []);

  const getMyWishList = () => {
    axios.get(`/api/mypage/${userId}/wishes`)
    .then((res) => {
      setWishList(res.data.result);
    })
    .catch(err => console.log(err))
  };

  return (
    <WishList wines={wishList}/>
  )
};

export default WishListContainer;