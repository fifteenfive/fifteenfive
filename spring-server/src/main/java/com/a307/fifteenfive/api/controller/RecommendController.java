package com.a307.fifteenfive.api.controller;


import com.a307.fifteenfive.api.responseDTO.SimpleWineResponseDto;
import com.a307.fifteenfive.api.responseDTO.WineResponseDto;
import com.a307.fifteenfive.api.service.RecommendService;
import com.a307.fifteenfive.api.service.ReviewService;
import com.a307.fifteenfive.api.service.UserService;
import com.a307.fifteenfive.api.service.WishService;
import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.User;
import com.a307.fifteenfive.db.entity.Wine;
import com.a307.fifteenfive.db.entity.Wish;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@Api(value = "추천 API", tags = {"Recommends"})
@RestController
@RequestMapping("/api/recommends")
public class RecommendController {

    private RecommendService recommendService;
    private UserService userService;
    private ReviewService reviewService;
    private WishService wishService;

    @Autowired
    public RecommendController(RecommendService recommendService, UserService userService, ReviewService reviewService, WishService wishService) {
        this.recommendService = recommendService;
        this.userService = userService;
        this.reviewService = reviewService;
        this.wishService = wishService;
    }

    // 라이프스타일별 와인리스트 반환(로그인시 위시리스트용)
    @GetMapping("/lifestyle-wish/{lifestyle_code}")
    @ApiOperation(value = "라이프스타일별 와인리스트 반환(로그인시 위시리스트용) ex. LT01", notes = "특정 라이프스타일에 대한 추천 와인 리스트를 반환한다")
    public ResponseEntity<HashMap<String, Object>> findWinesByWineLifestyleCodeOrderByScore(@PathVariable("lifestyle_code") String lifestyle_code) {

        HashMap<String, Object> resultList = new HashMap<>();

        List<WineResponseDto> wineResponseDtos = recommendService.findWinesByWineLifestyleCodeOrderByScore(lifestyle_code);
        String lifestyleName = String.valueOf(recommendService.getLifeStyleName(lifestyle_code));

        resultList.put("lifestyleName", lifestyleName);
        resultList.put("lifestyleCode", lifestyle_code);

        resultList.put("result", wineResponseDtos);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }


    @GetMapping("/lifestyle-same")
    @ApiOperation(value = "특정 유저 대상 라이프스타일 비슷한 유저의 추천", notes = "특정 유저를 대상으로 같은 라이프스타일인 사람들이 높은 평점을 준 와인을 리뷰 많은 순으로 출력한다.")
    public ResponseEntity<HashMap<String, Object>> findWinesBySameLifeStyleUserOrderByRate(@AuthenticationPrincipal String token) {

        HashMap<String, Object> resultList = new HashMap<>();

        User user = userService.getUserByUserEmail(token);
        String lifestyle_code = user.getUserLifestyleCode();
        String lifestyleName = String.valueOf(recommendService.getLifeStyleName(lifestyle_code));

        resultList.put("lifestyleName", lifestyleName);
        resultList.put("lifestyleCode", lifestyle_code);

        List<WineResponseDto> wineResponseDtos = recommendService.findWinesBySameLifeStyleUserOrderByRate(lifestyle_code);
        resultList.put("result", wineResponseDtos);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    // 이하는 유저정보 필요한 경우!(header 에 jwt token)
    // 라이프스타일별 추천(메인화면용)
    // 테이블이 정리되어 있어서 Dto 전환이 필요없지만 통일성 위해 SimpleWineResponseDto로 변환
    @GetMapping("/lifestyle-main")
    @ApiOperation(value = "특정 라이프스타일 대상 추천(메인화면용)", notes = "특정 라이프스타일 유저를 대상으로 와인을 추천한다.")
    public ResponseEntity<HashMap<String, Object>> findRecoWinesByWineLifestyleCode(@AuthenticationPrincipal String token) {

        HashMap<String, Object> resultList = new HashMap<>();

        User user = userService.getUserByUserEmail(token);
        String lifestyle_code = user.getUserLifestyleCode();
        String lifestyleName = String.valueOf(recommendService.getLifeStyleName(lifestyle_code));

        resultList.put("lifestyleName", lifestyleName);
        resultList.put("lifestyleCode", lifestyle_code);

        List<SimpleWineResponseDto>simpleWineResponseDtos = recommendService.findRecoWinesByWineLifestyleCode(lifestyle_code);

        resultList.put("result", simpleWineResponseDtos);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }


    // 이하는 유저정보 필요한 경우!(header 에 jwt token)
    @GetMapping("/usercf")
    @ApiOperation(value = "특정 유저 대상 user-based collaborative filtering", notes = "특정 유저를 대상으로 유저기반 협업필터링 추천 결과를 출력한다.")
    public ResponseEntity<HashMap<String, Object>> getWineByUserBasedCF(@AuthenticationPrincipal String token) {

        HashMap<String, Object> resultList = new HashMap<>();

        User user = userService.getUserByUserEmail(token);
        List<WineResponseDto> wineResponseDtos = recommendService.findWinesByUserBasedCF(user.getUserId());
        resultList.put("result", wineResponseDtos);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    // 이하는 유저정보 필요한 경우!(header 에 jwt token)
    @GetMapping("/itemcf/{user_id}")
    @ApiOperation(value = "특정 유저 대상 item-based collaborative filtering", notes = "특정 유저를 대상으로 아이템 기반 협업필터링 추천 결과를 출력한다.")
    public ResponseEntity<HashMap<String, Object>> getWineByItemBasedCF(@PathVariable("user_id") int userId) {
        HashMap<String, Object> resultList = new HashMap<>();
        List<Review> myReview = reviewService.myRecommendReviewList(userId);
        List<Wish> myWish = wishService.getWishlistByUserId(userId);
        Set<Integer> total = new HashSet<>();

        for(Review review: myReview) {
            total.add(review.getWine().getWineId());
        }
        for(Wish wish: myWish) {
            total.add(wish.getWineId());
        }
        Iterator<Integer> iter = total.iterator();
        List<Wine> wines = new ArrayList<>();
        List<Integer> total2 = new ArrayList<>();

        while (iter.hasNext()) {
            total2.add(iter.next());
        }

        Collections.shuffle(total2);
        for(Integer num: total2) {
            wines = recommendService.findWinesByItemBasedCF(num);
            if(!wines.isEmpty()){
                break;
            }
        }

        resultList.put("result", wines);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }




}
