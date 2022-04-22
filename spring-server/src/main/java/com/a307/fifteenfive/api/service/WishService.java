package com.a307.fifteenfive.api.service;

import com.a307.fifteenfive.api.responseDTO.RefResponseDto;
import com.a307.fifteenfive.api.responseDTO.ReviewResponseDto;
import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.Wine;
import com.a307.fifteenfive.db.entity.Wish;
import com.a307.fifteenfive.db.repository.WineRepository;
import com.a307.fifteenfive.db.repository.WishRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WishService {

    final WishRepository wishRepository;
    final WineRepository wineRepository;

    public WishService(WishRepository wishRepository, WineRepository wineRepository) {
        this.wishRepository = wishRepository;
        this.wineRepository = wineRepository;
    }

    public List<Wish> getWishlistByUserId(int userId) {
        List<Wish> wishlist = wishRepository.findWishlistByUserId(userId);
        return wishlist;
    }

    public boolean getWishlistByWineId(int userId, int wineId) {
        return wishRepository.findWishlistByWineId(userId, wineId) == 1;
    }

    public List<Wine> myWishlist(int userId) {
        List<Wine> wishlist = wineRepository.myWishlist(userId);
        return wishlist;
    }

    public boolean addWishlist(Wish wish) {
        return wishRepository.addWishlist(wish) == 1;
    }

    public boolean deleteWishlist(Wish wish) {
        return wishRepository.deleteWishlist(wish) == 1;
    }
}