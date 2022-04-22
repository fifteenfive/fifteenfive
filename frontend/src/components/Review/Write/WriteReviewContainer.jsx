import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import WriteReview from "./WriteReviewPresenter";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const WriteReviewContainer = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  // router state
  const [wineName, setWineName] = useState({});
  // form 관련 state
  const [rating, setRating] = useState(0); 
  const [content, setContent] = useState("");
  const [fileName, setfileName] = useState("이미지 파일을 선택해주세요");
  const [imageFile, setImageFile] = useState(null);
  const [elements, setElements] = useState({
    sweet: 0,
    body: 0,
    tannin: 0,
    acidity: 0,
  });
  
  // state로 넘어온 와인 이름 처리
  useEffect(() => {
    window.scrollTo(0, 0);
    setWineName({ 
      korName: location.state.korName, 
      engName: location.state.engName 
    });
  },[])

  const changeRating = (rate) => {
    setRating(rate);
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const changeImage = (e) => {
    const file = e.target.files;

    var maxSize = 1024 * 1024; //10mb
    if (e.target.files[0].size > maxSize) {
        Swal.fire({
          icon: 'warning',
          text: '1MB이하의 파일만 업로드 가능합니다',
          showConfirmButton: false,
          timer: 1500
        });
        return;
    }

    setfileName(file[0].name);  // 파일 이름
    setImageFile(e.target.files[0]);  // 실제 파일
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

    if (content.length < 5 || content.length > 100) {
      Swal.fire({
        icon: 'warning',
        text: '와인 리뷰는 5자 이상 100자 이내로 남겨주세요!',
        showConfirmButton: false,
        timer: 1500
      });
      return
    } 

    if (!elements.sweet || !elements.tannin || !elements.body || !elements.acidity) {
      Swal.fire({
        icon: 'warning',
        text: '와인 특성은 모두 선택해주세요',
        showConfirmButton: false,
        timer: 1500
      });
      return
    }

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
    };
    
    const token = localStorage.getItem('token');
    const url = `/api/wines/${location.state.wineId}/reviews`
    const config = {
      headers: { 
        Authorization: `Bearer ${token}`, 
        "Content-Type" : "multipart/form-data",
      },
    };
    axios.post(url, formData, config)
      .then(() => {
        const author = { 
          nickName: props.user.userNickName, 
          userId: props.user.userId, 
          profileUrl: props.user.userProfileUrl
        };

        // 리뷰 상세로 이동
        navigate(`/wines/${location.state.wineId}/reviews/user/${props.user.userId}`, { 
          state: {
            author: author 
          }
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <WriteReview 
      wineName={wineName}
      rating={rating}
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

export default connect(mapStateToProps)(WriteReviewContainer);