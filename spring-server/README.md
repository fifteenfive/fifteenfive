### 0316
- 도커파일(nginx, spring-server, django-server)을 작성하였습니다.
- jenkins, nginx를 도커로 실행해서 발생하는 어려움이 존재 -> 블로그에 기록중
- spring-server 가 올바르게 빌드, 컨테이너가 실행되면 그때 nginx 컨테이너 내 설정해둔 대로 포트포워딩으로 연결할 예정

### 0317
- SwaggerApi를 연동하였습니다. http://localhost:8080/swagger-ui/index.html
- 원격 서버의 mySQL 을 연동하였습니다.
- user, code, code_type 테이블을 생성하고 엔티티를 매핑 하였습니다.
- [POST]/api/users/signup 으로 유저 정보가 테이블에 저장됩니다.
- 비밀번호를 암호화 하였습니다. (참고) shorturl.at/qszGV
- 이메일 중복체크 예외처리를 하였습니다.
- (여유가 된다면) validation 주석 풀어서 프론트단과 공유하기

### 0321

- jwt 토큰 로그인 추가
- 회원 탈퇴 기능 추가
- (여유가 된다면) redis 활용하기
- 프로필 이미지 등록하는법 알아보기

### 0322

- 인증과 권한 관련 기능을 수정하였습니다.
- URL 도 바뀌었기 때문에 swagger로 꼭 확인해주세요!
과정
1. (이메일, 패스워드) 회원가입을 하면 유저정보가 데이터베이스에 저장됩니다.
2. (이메일, 패스워드) 로그인을 하면 JWT 토큰이 발행됩니다.
```
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NDIiLCJyb2xlcyI6IlJPTEVfVVNFUiIsImlhdCI6MTY0NzkyODk3MSwiZXhwIjoxNjQ4MTg4MTcxfQ.iILyGhQIlTVL0vjUKVPbWhmwFfP8h50yXBGViszIhrU",
...
}
```
3. 이후 요청 HEADER에 'Authorization' 라는 이름으로 토큰을 넣어서 요청해주세요. 이 때, **토큰 앞에 `Bearer` 넣으시고 한 칸 띄워주세요!!!**
- `key` : Authorization
- `value` : Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NDIiLCJyb2xlcyI6IlJPTEVfVVNFUiIsImlhdCI6MTY0NzkyODk3MSwiZXhwIjoxNjQ4MTg4MTcxfQ.iILyGhQIlTVL0vjUKVPbWhmwFfP8h50yXBGViszIhrU

4. GET http://localhost:8080/api/auth/users/1/my-info 처럼 나의 마이페이지 정보인 경우 위의 토큰이 없다면 403 Forbidden 에러가 뜹니다.
5. GET http://localhost:8080/api/auth/users/1 처럼 일반 유저의 정보인 경우 토큰이 없어도 200 OK 를 반환합니다.

### 0323

- SwaggerUI 의 Authorization 을 추가하였습니다.

```
Bearer (한칸띄고) eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsbHVuYTNAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2NDgwMzc5NDYsImV4cCI6MTY0ODI5NzE0Nn0.9sZ2PcXp0PVz4VGSUM1cJm6a8U7gLfAzcY_QFguQhas
```
-> 이렇게 입력해주심 됩니다!

- 엔티티 연관관계 매핑 및 Dto 세팅

- 와인 상세정보 제공 API 개발

  - 특정 와인에 해당하는 여러개의 아로마 리스트 추가

- 와인 리뷰상세 API 개발

  - 특정 와인의 모든 리뷰 리스트로 출력

  

### 0324

- EC2 서버에 자동 배포를 구축하였습니다.
  - 빌드중에는 웹서버가 동작하지 않습니다.

![Screen Shot 2022-03-24 at 1.07.09 PM](README.assets/Screen Shot 2022-03-24 at 1.07.09 PM.png)

- netdata를 사용하여 실시간으로 CPU 사용량을 체크합니다. 
  - http://j6a307.p.ssafy.io:19999/#menu_system_submenu_cpu;after=0;before=0;theme=slate;utc=Asia/Seoul

![Screen Shot 2022-03-24 at 1.13.12 PM](README.assets/Screen Shot 2022-03-24 at 1.13.12 PM-8095204.png)





### 0325~0326

- 리뷰 CREATE 기능을 추가하였습니다.
- Amazon S3 와 연동하였습니다.
  - application-aws.yml 을 application.yml 에 추가하였으며 개인정보(key) 가 담겨있는 application-aws.yml 은 .gitignore 에 추가하였습니다.
  - 이미지를 Multifile 형태로 프론트에서 전달받고 -> File 타입으로 변환합니다.
  - 이후 S3 에 전달하고 로컬에 자동으로 생성되는 파일은 삭제합니다.
  - 이미지 url은 중복시 에러가 발생하기 때문에 `와인 id - 유저 아이디 - UUID - 파일명` 으로 구성하였습니다.



### 0328

- API 수정 사항을 반영하였습니다. https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22A307/-/issues/1
- 리뷰에 이미지 없어도 저장되도록 수정하였습니다.



### 0329

- 특정 유저 대상 아이템기반 추천리스트를 반환합니다.

- 특정 유저 대상 유저기반 추천리스트를 반환합니다.

- authorization 에 토큰 넣어주시면 됩니다. (swagger에서는 authorize만 해주시면 됩니다.)

- 참고: 테이블에 해당유저 추천와인이 없는경우 빈 리스트가 반환됩니다. => 리뷰를 남겨달라던지.. 빈 리스트일때 추가적인 조치가 필요할 것 같습니다.

- 특정 리뷰 수정 및 삭제



### 0330

- 리뷰를 남긴 유저가 해당 와인에 남긴 모든 리뷰 반환(최근날짜순) 
- 유저정보 업데이트(라이프스타일) [PUT] http://localhost:8080/api/auth/users/56

- 유저정보 업데이트 (프로필 : 프로필이미지, 닉네임) [PUT] http://localhost:8080/api/auth/users/56/my-profile



### 0331

- [버그해결] Form-data 형식이 utf-8 한글이 적용되지 않는 에러 - utf-8 필터를 강제로 주던 것을 해제

- 기존 기능

/lifestyle/{lifestyle_code}   => 라이프스타일별 와인추천리스트(추천테이블에 들어있는것을 그대로 출력)

- 추가 기능 (메인용)

/lifestyle => 나와 같은 라이프스타일인 사람들이 평점을 준 와인을 평점순으로 최대 10개 출력
