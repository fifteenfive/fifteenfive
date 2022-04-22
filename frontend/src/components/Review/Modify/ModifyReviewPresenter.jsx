import React from "react";
import styles from'./ModifyReview.module.css';
import Rating from '@mui/material/Rating';
import WineElement from "./WineElementContainer";

const ModifyReview = ({ wineName, rating, content, fileName, elements, changeImage, changeContent, changeRating, onSubmit, changeElement }) => {
  return (
    <div className={styles.container}>
      {/* <h1>와인 리뷰</h1> */}
      <div className={styles.header}>
        <div className={styles.wine_name}>
          <h3>{wineName.korName}</h3>
          <p>{wineName.engName}</p>
        </div>
        <div className={styles.rating_box}>
          <p>{rating}</p>
          <Rating
            name="half-rating"
            value={rating}
            precision={0.5}
            sx = {{ fontSize: 30, color: "#FBE731" }}
            onChange={(e, newValue) => {
              changeRating(newValue)
            }}
          />
        </div>
      </div>
      <div className={styles.forms}> 
        <textarea  cols="30" rows="11" placeholder="와인에 대한 평을 남겨 주세요" value={content} onChange={changeContent}></textarea>
        <div className={styles.file_upload}>
          <p>{fileName}</p>
          <label htmlFor="image">업로드</label>
          <input 
            type="file" 
            name="image" 
            id="image" 
            accept="image/png, image/jpeg, image/jpg" 
            style={{ display:"none" }}
            onChange={changeImage}
          />
        </div>
        <div className={styles.wine_element_box}>
            <div className={styles.row}>
              <WineElement type={["당도", "sweet"]} value={elements.sweet} changeElement={changeElement}></WineElement>
              <WineElement type={["바디", "body"]} value={elements.body} changeElement={changeElement}></WineElement>
            </div>
            <div className={styles.row}>
              <WineElement type={["산미", "acidity"]} value={elements.acidity} changeElement={changeElement}></WineElement>
              <WineElement type={["타닌", "tannin"]} value={elements.tannin} changeElement={changeElement}></WineElement>
            </div>
        </div>
      </div>
      <div className={styles.submit}>
        <button onClick={onSubmit}>수정하기</button>
      </div>
    </div>
  );
};

export default ModifyReview;
