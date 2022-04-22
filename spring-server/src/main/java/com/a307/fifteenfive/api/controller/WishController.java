package com.a307.fifteenfive.api.controller;

import com.a307.fifteenfive.api.responseDTO.RefResponseDto;
import com.a307.fifteenfive.api.service.ReviewService;
import com.a307.fifteenfive.api.service.WishService;
import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.Wine;
import com.a307.fifteenfive.db.entity.Wish;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Api(value = "위시리스트 API", tags = {"Wishlist"})
@RestController
@RequestMapping("/api/wishlist")
public class WishController {

    private static final String SUCCESS = "200";
    private static final String FAIL = "500";

    private final WishService wishService;

    @Autowired
    public WishController(WishService wishService) {
        this.wishService = wishService;
    }

    // 유저의 위시리스트 반환
    @GetMapping("/{user_id}")
    @ApiOperation(value = "유저의 위시리스트 반환", notes = "특정 유저의 위시리스트를 반환한다")
    public ResponseEntity<HashMap<String, Object>> getWishlist(@PathVariable("user_id") int userId) {
        HashMap<String, Object> resultList = new HashMap<>();

        List<Wish> wishlistList = wishService.getWishlistByUserId(userId);

        resultList.put("result", wishlistList);

        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    // 와인의 위시리스트 등록 유무 확인
    @GetMapping("/{user_id}/{wine_id}")
    @ApiOperation(value = "유저의 위시리스트 등록 여부 반환", notes = "특정 유저의 와인에 대한 위시리스트 등록 여부를 반환한다")
    public ResponseEntity<String> getWish(@PathVariable("user_id") int userId, @PathVariable("wine_id") int wineId) {

        if(wishService.getWishlistByWineId(userId, wineId)) {
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(FAIL, HttpStatus.OK);
        }
    }

    // 유저의 위시리스트 추가
    @PostMapping("/")
    @ApiOperation(value = "유저의 위시리스트 추가", notes = "특정 유저의 위시리스트를 추가한다")
    public ResponseEntity<String> addWishlist(@RequestBody Wish wish) {
        wishService.addWishlist(wish);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    // 유저의 위시리스트 삭제
    @DeleteMapping("/")
    @ApiOperation(value = "유저의 위시리스트 삭제", notes = "특정 유저의 위시리스트를 삭제한다")
    public ResponseEntity<String> deleteWishlist(@RequestBody Wish wish) {
        wishService.deleteWishlist(wish);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

}
