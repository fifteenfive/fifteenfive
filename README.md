<img src="https://image.kkday.com/v2/image/get/s1.kkday.com/product_7853/20160504101248_nmmt5/jpg" width = "800" height="400">

# :bookmark: 목차

- [**서비스 소개**](#diamonds-서비스-소개)
- [**추천 알고리즘 소개**](#hearts-추천-알고리즘-소개)
- [**팀 소개**](#spades-팀-소개)
- [**기술 스택**](#clubs-기술-스택)
- [**서버 아키텍쳐**](#bookmark_tabs-서버-아키텍쳐)
- [**ERD**](#bookmark_tabs-ERD)
- [**사이트 레이아웃**](#books-사이트-레이아웃)


# :diamonds: 서비스 소개
#### 라이프스타일 기반 빅데이터 와인추천서비스 15.5도
> 와인을 마시기 가장 좋은 온도, 가장 맛있는 와인의 도수 15.5도<br/>
> 15.5도는 국내에서 유통되고 있는 와인 1,695종, 글로벌 와인 애호가 15,135명의 리뷰 101,314개를 기반으로 최적의 와인을 추천 드립니다.<br/>

협업 필터링 추천 알고리즘을 기반으로 추천 로직을 구현하였으며 '라이프스타일' 콘셉트를 도입하여<br> 
협업 필터링 알고리즘의 최대 약점인 콜드스타트 문제(첫 가입 유저는 상품에 대한 평가데이터가 없어 추천해주지 못하는 문제) 를 해결함과 동시에<br>
나와 같은 라이프스타일인 유저를 찾아보는 재미를 느낄 수 있으며<br>
자세한 와인 정보 없이도 다양한 추천을 받을 수 있는 서비스입니다.<br/>
- 소개 바로가기 : https://j6a307.p.ssafy.io/about

#### :wine_glass: 기획배경
> 최근 혼술을 하는 인원의 수가 많이 늘어나고 있습니다. <br/>
또한 이마트, 편의점, 백화점 등에도 와인을 쉽게 접하면서 와인에 대한 관심도가 높아지고 있습니다.<br/>
하지만 관심도에 비해 개인화된 와인 추천을 받을 수 있는 서비스는 찾기 어렵습니다. <br/>
15.5도는 와인 입문자들도 라이프스타일만 선택하면 만족스러운 와인을 추천받을 수 있도록 기획하였습니다. <br/>

#### UCC
https://www.youtube.com/watch?v=lle-oZIPz_k&feature=youtu.be

#### 최종 발표자료
https://shorturl.at/dlowE

#### :wine_glass: 주요기능
- 와인 Top 10 순위
- 라이프스타일 별 와인 추천
- 와인 검색
- 와인 상세보기
- 와인 냉장고(북마크)
- 리뷰


# :hearts: 추천 알고리즘 소개
### 협업 필터링 알고리즘이란?

- 나와 유사한 유저가 높은 평점을 준 와인을 추천 : user-based<br/>
- 내가 높은 평점을 준 와인과 유사한 와인 : item-based<br/>
→ 따라서 콜드스타트 문제가 발생 (첫 가입 유저는 리뷰나 위시리스트 등 상품에 대한 평가데이터가 없기 때문)<br/>
→ 15.5도는 라이프스타일이라는 개념을 도입하여 흥미유발과 동시에 콜드스타트 문제를 해결<br/>

### 15.5도 로직
#### :wine_glass: Memory-based 협업 필터링
##### user-based Collaborative Filtering 
- 유사한 유저가 높은 평점을 준 와인 추천
##### Item-based Collaborative Filtering
- 유저가 4점 이상 준 와인과 위시리스트에 담은 와인 중 한 와인과 유사한 와인을 추천

#### :wine_glass: 데이터 크롤링
##### 참고사이트
> **vivino - https://www.vivino.com/US-CA/en/**  <br/>
> **wine21 - https://www.wine21.com/**

##### 라이브러리
<img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white">
<img src="https://img.shields.io/badge/selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white">

##### 크롤링 데이터
![csv파일](./picture/크롤링csv파일.PNG)
- 평점: 101314개
- 와인: 1695개
- 유저: 15135명


# :spades: 팀 소개
![Team](./frontend/src/assets/logo_r2.png)

#### 팀 구성
|이름|역할|비고|
|------|----|-------|
|방의진|팀장|BE개발 - Spring-boot, 인프라 조성|
|김동영|팀원|BE개발 - Spring-boot|
|채예은|팀원|BE개발 - Python, Django, 추천알고리즘 개발|
|유재룡|팀원|BE개발 - Python, Django, DB관리|
|김선민|팀원|FE개발 - React, UI/UX개발|
|나지엽|팀원|FE개발 - React, UI/UX개발|

#### 상세 역할
|  이름  |        역할        | <div align="center">개발 내용</div> |
| :----: | :----------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 방의진 | Back-end<br />팀장 | - DB 설계<br />- Spring Data JPA & Swagger API 세팅<br/> - Spring Boot로 RESTful API 작성(유저 관리 API, 와인정보 API, 리뷰 API)<br />- 스프링 시큐리티, JWT를 이용한 인증 구현<br />- 대량의 이미지 처리를 위한 Amazon S3 Bucket 연동<br />- EC2 인프라 환경 세팅 및 배포<br />  - Gitlab webhook, Jenkins, Docker를 활용한 CI/CD<br />- Letsencrypt, Certbot을 이용한 서비스 SSL 보안 적용<br />- Nginx 웹서버 적용(Load Balancing, Reverse Proxy, Service Redirect설정)<br />- 트래픽 분산을 위해 여러 대의 스프링 도커 서버로 리버스프록시 구성<br /> - 도커 컨테이너 환경에서 장고-크론탭 실행 <br /> - 프로젝트 관리(Notion, Mattermost, Jira)<br />|
| 김동영 |      Back-end      |  - Spring-boot API 구현(마이페이지 API)<br /> - UCC 제작<br /> - API 연동 테스트<br /> |
| 채예은 |      Back-end      | - DB 설계<br />- Selenium, Beautiful soup을 활용해 와인 리뷰 데이터 크롤링<br />- Pandas로 수집한 데이터 전처리 & 정제<br />- Django로 평점, 위시리스트를 통한 User-based,  Item-based 협업 필터링 추천 시스템 구현<br />- Crontab으로 Django 추천 알고리즘 주기적 실행<br />- 프론트엔드 디자인 수정<br /> |
| 유재룡 |     Back-end       |  - DB 설계<br />- Python를 이용한 Data 크롤링<br />- Springboot와 Django 간의 API 구축 및 연결<br />- CSV 및 Python을 이용한 데이터 정제 및 MySQL 데이터 삽입<br />- DB 및 ERD 제작 및 관리<br /> - Readme, PPT 등 문서 작업<br />|
| 김선민 |     Front-end     |    - React와 Route를 사용하여 SPA 및 조건부 렌더링 구현<br />- Redux를 사용하여 전역 상태 관리<br />- Axios를 이용한 API 비동기 통신<br />- styled-components와 material-ui를 이용한 레이아웃 구현 및 css 스타일링<br />- UCC 시연 영상 제작<br /> |
| 나지엽 |     Front-end      | - React, Route, Redux를 사용하여 SPA 및 조건부 렌더링 구현<br />- Axios를 이용한 API 비동기 통신<br />- styled-component와 material-ui, react slick을 이용한 레이아웃 구현 및 css 스타일링<br />  |


# :clubs: 기술 스택

#### FE
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black">
<img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=black">


#### BE
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> 
<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 

#### server
<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=white">

#### 프로젝트 관리
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">

# :bookmark_tabs: 서버 아키텍쳐
![SERVER](./picture/server.jpeg)

# :bookmark_tabs: ERD
![ERD](./picture/특화_1차.png)

# :books: 사이트 레이아웃
#### :wine_glass: 홈페이지 주소
- **https://j6a307.p.ssafy.io/**

#### :wine_glass: 메인화면
![메인화면](./picture/메인화면.PNG)
![메인화면2](./picture/메인화면2.PNG)

#### :wine_glass: 라이프 스타일 선택 화면
![라이프 스타일 선택](./picture/라이프스타일_선택_화면.PNG)
![라이프 스타일 와인 선택](./picture/라이프_스타일_와인_선택_화면.PNG)

#### :wine_glass: 와인 상세 페이지
![와인 상세 페이지](./picture/와인_상세_페이지.PNG)

#### :wine_glass: 마이 페이지
![와인 냉장고](./picture/와인냉장고.PNG)
![리뷰 관리](./picture/리뷰_관리.PNG)
