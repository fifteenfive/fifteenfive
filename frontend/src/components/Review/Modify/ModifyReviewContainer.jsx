import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import ModifyReview from "./ModifyReviewPresenter";
import { connect } from 'react-redux';

const ModifyReviewContainer = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  // state
  const [wineName, setWineName] = useState({});
  const [prevReview, setPrevReview] = useState({});
  const [rating, setRating] = useState(0); 
  const [content, setContent] = useState("");
  const [fileName, setfileName] = useState("이미지 파일을 선택해주세요");
  const [imageFile, setImageFile] = useState(null);
  const [elements, setElements] = useState({});
  
  // state로 넘어온 기존 리뷰 데이터 처리
  useEffect(() => {
    const review = location.state.review;

    setPrevReview(review);
    setContent(review.content);
    setWineName(location.state.wineName);
    setRating(review.score); 
    setElements((prev)=> ({
      ...prev,
      sweet: review.reviewSweet,
      body: review.reviewBody,
      tannin: review.reviewTannin,
      acidity: review.reviewAcidity
    }));
  }, [])

  const changeRating = (rate) => {
    setRating(rate);
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const changeImage = (e) => {
    const file = e.target.files;

    setfileName(file[0].name);
    setImageFile(e.target.files[0]);
  };

  const changeElement = (type, value) => {
    if (type === "body") {
      setElements((prev) => {
        return {...prev, body: value}
      });
    } else if (type === "sweet") {
      setElements((prev) => {
        return {...prev, sweet: value}
      });
    } else if (type === "tannin") {
      setElements((prev) => {
        return {...prev, tannin: value}
      });
    } else {
      setElements((prev) => {
        return {...prev, acidity: value}
      });
    }
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('reviewImg', imageFile); // 첨부파일

    const review = {
      wine_id: location.state.wineId,
      score: rating,
      content: content,
      reviewSweet: elements.sweet,
      reviewBody: elements.body,
      reviewTannin: elements.tannin,
      reviewAcidity: elements.acidity,
    };
    
    for (let key in review) {
      formData.append(key, review[key]);  // 리뷰 데이터
    }
    
    const token = localStorage.getItem('token');
    const url = `/api/wines/${location.state.wineId}/reviews/${prevReview.reviewId}`
    const config = {
      headers: { 
        Authorization: `Bearer ${token}`, 
        "Content-Type" : "multipart/form-data",
      },
    };
    axios.put(url, formData, config)
      .then(() => {
        const author = { 
          nickName: prevReview.userNickName, 
          userId: prevReview.userId, 
          profileUrl: prevReview.userProfileUrl
        };

        // 리뷰 상세로 이동
        navigate(`/wines/${location.state.wineId}/reviews/user/${prevReview.userId}`, { 
          state: {
            author: author 
          }
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <ModifyReview 
      wineName={wineName}
      rating={rating}
      content={content}
      fileName={fileName}
      elements={elements}
      changeElement={changeElement}
      changeImage={changeImage}
      changeRating={changeRating}
      changeContent={changeContent}
      onSubmit={onSubmit}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ModifyReviewContainer);