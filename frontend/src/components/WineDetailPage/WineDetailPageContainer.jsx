import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import WineDetail from "./WineDetailPagePresenter";
import { connect } from "react-redux";

const WineDetailPageContainer = ({ user }) => {
  const navigate = useNavigate();
  const { wineId } = useParams();
  const [wine, setWine] = useState({
    aromaList: []
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [wishList, setWishList] = useState(false);
  const [reviews, setReviews] = useState({});
  const [pageReviews, setPageReviews] = useState([]);
  const token = localStorage.getItem('token');

  // 와인 상세 정보 GET
  useEffect(()=> {
    axios.get(`/api/wines/${wineId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res)=>{
        const wineData = res.data.result
        setWine(wineData)

        const price = wineData.winePrice
        const priceFormat = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); 
        setWine((prevState) => ({
          ...prevState,
          winePrice: priceFormat
        }))
      })
      .catch(err => console.log(err))
  }, [])

  // 전체 리뷰목록 get
  useEffect(() => {
    window.scrollTo(0, 0);
    const url = `/api/wines/${wineId}/reviews`
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res)=>{
        setReviews(res.data)
        let totalPages = Object.keys(res.data).length;
        setTotalPages(totalPages)
        setPageReviews(res.data[page])
      })
      .catch(err => console.log(err));
  }, [])


  // 위시리스트 정보 get
  useEffect(() => {
    if (user.userId) {
      getWishList();
    }
  }, []);

  const getWishList = () => {
    axios.get(`/api/wishlist/${user.userId}/${wineId}`)
    .then((res) => {
      res.data === 200 ? setWishList(true) : setWishList(false);
    })
    .catch(err => console.log(err));
  };

  const addWishList = () => {
    const data = {
      userId: user.userId,
      wineId: Number(wineId)
    }
    axios.post('/api/wishlist/', data)
    .then(() => {
      setWishList(true);
    })
    .catch(err => console.log(err));
  };

  const deleteWishList = () => {
    const data = {
      userId: user.userId,
      wineId: wineId
    }
    axios.delete('/api/wishlist/', { data : data })
    .then(() => {
      setWishList(false);
    })
    .catch(err => console.log(err));
  };

  // 아이콘 클릭시 위시리스트 변화
  const toggleWishList = () => {
    wishList ? deleteWishList() : addWishList();
  }

  // pagination
  const changePage = (event, value) => {
    setPage(value);
    setPageReviews(reviews[value]);
  };

  // 리뷰작성 이동 
  const writeReview = () => {
    navigate("/review", { state: {korName: wine.korName, engName: wine.engName, wineId: wineId}})
  };


  return (
    <WineDetail 
      wine={wine} 
      wishList={wishList}
      changeWishList={toggleWishList}
      reviews={pageReviews} 
      writeReview={writeReview} 
      totalPages={totalPages}
      changePage={changePage} 
    />
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(WineDetailPageContainer);