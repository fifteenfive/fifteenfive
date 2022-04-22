import React from "react";
import styles from './About.module.css';
import clsx from 'clsx';

const About = () => {
  return (
    <div>
    <div className={clsx(styles.image)}>
    </div>

    <div className={styles.container}>
      {/* 
        About 폴더의 About.module.css에서 css만 따로 작성하는 방식으로 가능해요
        class 이름 지정 방식  =>  className={styles.클래스이름}
      */}

      <img className={styles.mt6} src={require("../../assets/logo_r2.png")} style={{ width: "auto", height: "7rem"}} alt="logo" />
      <p className={styles.mt6}>와인을 마시기 가장 좋은 온도</p>
      <p className={styles.mt1}>가장 맛있는 와인의 도수</p>
      <img className={styles.mt3} src={require("../../assets/q.png")} style={{ width: "auto", height: "1rem"}} alt="1" />
      <h2 className={clsx(styles.r3, styles.mt05)}>15.5도</h2>
      <p className={clsx(styles.mt6)}>🍷</p>
      
      <p className={clsx(styles.mt6)}>요즘 와인 가게 많던데.. 어떤 와인을 마셔야 하나? 🤔</p>

      <img className={styles.mt6} src={require("../../assets/q.png")} style={{ width: "auto", height: "1rem"}} alt="1" />
      <h2 className={clsx(styles.r3, styles.mt05)}>이제 고민은 NO NO</h2>
      <p className={clsx(styles.mt1)}>나와 같은 라이프스타일의 사람들👨‍👩‍👧‍👦을 찾아보세요!</p>
      <p className={clsx(styles.mt1)}>나와 비슷한 취향의 와인 러버💕들을 찾아보고</p>
      <p className={clsx(styles.mt1)}>구매 가능한 와인🍷도 구경해보세요</p>

      <h2 className={clsx(styles.r3, styles.mt6)}>어디에서? 15.5도에서!</h2>

      <p className={clsx(styles.mt6)}>15.5도는</p>
      <p className={clsx(styles.mt1)}>국내에서 유통되고 있는 와인 <span className={clsx(styles.fs2)}>1,695</span>종,</p>
      <p className={clsx(styles.mt1)}>글로벌 와인 애호가 <span style={{fontWeight: 'bold'}}>15,135명</span>의 리뷰 <span className={clsx(styles.fs2)}>101,314개</span>를 기반으로</p>
      <p className={clsx(styles.mt1)}>최적의 와인을 추천 드립니다.</p>
      <p className={clsx(styles.mt1)}></p>

      <img className={styles.mt6} src={require("../../assets/q.png")} style={{ width: "auto", height: "1rem"}} alt="1" />
      <h2 className={clsx(styles.r3, styles.mt05)}>라이프스타일을 골라봐!</h2>
      <p className={clsx(styles.mt1, styles.engfont, styles.fs2)}>lifestyle 👨‍👩‍👧‍👦</p>
      <p className={clsx(styles.mt3)}>라이프 스타일을 고르고</p>
      <p className={clsx(styles.mt1)}>여러분의 취향을 확인해보세요.</p>
      <img className={styles.mt3} src={require("../../assets/lf.jpg")} style={{ width: "auto", height: "30rem", marginLeft:"2rem"}} alt="logo" />
      <h2 className={clsx(styles.r3, styles.mt05)}></h2>


      <img className={styles.mt3} src={require("../../assets/q.png")} style={{ width: "auto", height: "1rem"}} alt="1" />
      <h2 className={clsx(styles.r3, styles.mt05, styles.engfont)}>lifestyle matters</h2>
      <p className={clsx(styles.mt1)}>라이프스타일별 설문 통계를 기반으로 추천 드립니다.</p>

      <img className={styles.mt3} src={require("../../assets/lifestyle.jpg")} style={{ width: "auto", height: "15rem", marginLeft:"2rem"}} alt="logo" />
      <h2 className={clsx(styles.r3, styles.mt05)}></h2>

      <img className={styles.mt3} src={require("../../assets/q.png")} style={{ width: "auto", height: "1rem"}} alt="1" />
      <h2 className={clsx(styles.r3, styles.mt05)}>15.5도만의 추천!</h2>
      <p className={clsx(styles.mt1)}>15.5도가 제안하는 추천🍷입니다.</p>

      <img className={styles.mt3} src={require("../../assets/about1.jpg")} style={{ width: "auto", height: "25rem", marginLeft:"2rem"}} alt="logo" />
      <h2 className={clsx(styles.r3, styles.mt05)}></h2>

      <img className={styles.mt3} src={require("../../assets/q.png")} style={{ width: "auto", height: "1rem"}} alt="1" />
      <p className={clsx(styles.mt1)}>와인을 마셨다면...</p>

      <h2 className={clsx(styles.r3, styles.mt3)}>리뷰로 추억을 기록하고</h2>
      <h2 className={clsx(styles.r3, styles.mt05)}>나만의 와인셀러🍷에 간직하세요.</h2>
      <p className={clsx(styles.mt6)}>마시고 싶은 와인은 위시리스트에 담고</p>
      <h2 className={clsx(styles.r3, styles.mt05)}>위시리스트에서 꺼내보세요.🍷</h2>



      <p className={clsx(styles.mt6)}>우리가 만들어가는 곳</p>
      <h2 className={clsx(styles.r3, styles.mt05)}>15.5도</h2>
      <p className={clsx(styles.mt3)}>.</p>
      <p className={clsx(styles.mt3)}>.</p>
      <p className={clsx(styles.mt3)}>자 이제 모두에게...건배...🍷🍷</p>
      <p className={clsx(styles.mt3)}>.</p>
      <p className={clsx(styles.mt3)}>.</p>
      <h2 className={clsx(styles.r3, styles.mt6, styles.engfont)}>Who made this</h2>
      <p className={clsx(styles.mt1)}>15.5도 makers 👩‍💻👨‍💻</p>
      <img className={styles.mt3} src={require("../../assets/team.jpg")} style={{ width: "auto", height: "15rem"}} alt="logo" />

      <p className={clsx(styles.mt6)}></p>
      <p></p>

      </div>
      </div>
  )
};

export default About;