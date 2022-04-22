package com.a307.fifteenfive.api.service;

import com.a307.fifteenfive.api.requestDTO.ReviewRequestDto;
import com.a307.fifteenfive.api.responseDTO.RefResponseDto;
import com.a307.fifteenfive.api.responseDTO.ReviewResponseDto;
import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.User;
import com.a307.fifteenfive.db.entity.Wine;
import com.a307.fifteenfive.db.repository.ReviewRepository;
import com.a307.fifteenfive.db.repository.WineRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j
@Service
public class ReviewService {

    final ReviewRepository reviewRepository;
    final WineRepository wineRepository;
    private final S3Uploader s3Uploader;

    // 생성자로 빈을 주입받을 때에는 생성자가 1개여야한다.
    public ReviewService(ReviewRepository reviewRepository, WineRepository wineRepository, S3Uploader s3Uploader) {
        this.s3Uploader = s3Uploader;
        this.reviewRepository = reviewRepository;
        this.wineRepository = wineRepository;
    }

    // 리뷰 작성
    @Transactional
    public Review postReview(ReviewRequestDto reviewRequestDto, MultipartFile multipartFile, User user, int wine_id) throws NullPointerException {

        Wine wine;

        //파일 이름 중복을 피하기 위해서, 랜덤한 UUID를 이름에 포함
        UUID uuid = UUID.randomUUID();

        String imageUrl = null;
        try {
            if (!multipartFile.isEmpty()) {

                log.info("multipartFile={}", multipartFile);
                log.info("originalFilename={}", multipartFile.getOriginalFilename());

                String uuid_str = uuid.toString();

                // custom file name
                String customFileName = uuid_str + '-' + multipartFile.getOriginalFilename();
                imageUrl = s3Uploader.upload(multipartFile, "static", customFileName);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        wine = wineRepository.findWineByWineId(wine_id);
        Review review = reviewRepository.save(reviewBuilder(reviewRequestDto, imageUrl, user, wine));

        return review;

    }

    // 리뷰 수정
    @Transactional
    public Review updateReview(ReviewRequestDto reviewRequestDto, MultipartFile multipartFile, User user, int wine_id, Review old_review) throws NullPointerException {

        Wine wine;

        // 들어온 파일이 없다면 pass
        // 들어온 파일이 있다면 기존 파일을 삭제하고 새로 추가

        // 파일 이름 중복을 피하기 위해서, 랜덤한 UUID를 이름에 포함
        UUID uuid = UUID.randomUUID();

        String imageUrl = null;
        try {
            if (!multipartFile.isEmpty()) {
                String old_file_name = old_review.getReviewImgUrl();

                if (old_file_name != null) {
                    s3Uploader.disload(old_file_name);
                }

                String uuid_str = uuid.toString();

                // custom file name
                String customFileName = uuid_str + '-' + multipartFile.getOriginalFilename();
                imageUrl = s3Uploader.upload(multipartFile, "static", customFileName);


            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        wine = wineRepository.findWineByWineId(wine_id);

        // 아이디 업데이트
        Review updated_review = reviewBuilder(reviewRequestDto, imageUrl, user, wine);
        updated_review.setReviewId(old_review.getReviewId());
        reviewRepository.save(updated_review);

        return updated_review;

    }

    // reviewRequestDto 와 이미지 url 을 review 로 빌드
    public Review reviewBuilder(ReviewRequestDto reviewRequestDto, String reviewImgUrl, User user, Wine wine) {

        return Review.builder()
                .score(reviewRequestDto.getScore())
                .content(reviewRequestDto.getContent())
                .reviewImgUrl(reviewImgUrl)
                .reviewSweet(reviewRequestDto.getReviewSweet())
                .reviewAcidity(reviewRequestDto.getReviewAcidity())
                .reviewTannin(reviewRequestDto.getReviewTannin())
                .reviewBody(reviewRequestDto.getReviewBody())
                .user(user)
                .wine(wine)
                .build();

    }

    // 리뷰 삭제
    @Transactional
    public Review deleteReview(int reviewId) throws NullPointerException {

        // 기존 이미지 삭제
        Review review = reviewRepository.findReviewByReviewId(reviewId);
        String old_file_name = review.getReviewImgUrl();

        if (old_file_name != null) {
            s3Uploader.disload(old_file_name);
        }

        reviewRepository.deleteReviewByReviewId(reviewId);

        return review;

    }

    // 리뷰 상세정보
    public Review getReviewByReviewId(int review_id) {
        return reviewRepository.findReviewByReviewId(review_id);

    }


    // 특정 와인의 모든 리뷰
    public Map<Integer, List<ReviewResponseDto>> findAllReviewsByWineId(int wine_id) {
        Map<Integer, List<ReviewResponseDto>> pageDto = new HashMap<>();

//        List<Review> reviews = reviewRepository.findAllReviewsByWineId(wine_id);

        Integer total = reviewRepository.countByWineId(wine_id);

        log.info("Total:{}", total);
        log.info("Total/3:{}", total / 3);
        if (total % 3 == 0) {
            for (int i = 0; i < total / 3; i++) {
                Pageable sortByDate = PageRequest.of(i, 3, Sort.by("created_time").descending());
                List<Review> reviews = reviewRepository.findAllReviewsByWineId(wine_id, sortByDate);

                List<ReviewResponseDto> reviewResponseDtos = new ArrayList<>();

                for (Review review : reviews) {
                    reviewResponseDtos.add(ReviewResponseDto.of(review));
                }

                pageDto.put(i + 1, reviewResponseDtos);

            }

        } else {
            for (int i = 0; i < total / 3 + 1; i++) {
                Pageable sortByDate = PageRequest.of(i, 3, Sort.by("created_time").descending());
                List<Review> reviews = reviewRepository.findAllReviewsByWineId(wine_id, sortByDate);

                List<ReviewResponseDto> reviewResponseDtos = new ArrayList<>();

                for (Review review : reviews) {
                    reviewResponseDtos.add(ReviewResponseDto.of(review));
                }

                pageDto.put(i + 1, reviewResponseDtos);

            }

        }

        return pageDto;

    }


    // 리뷰를 남긴 유저가 해당 와인에 남긴 모든 리뷰 반환
    public List<ReviewResponseDto> findAllReviewsByUserIdAndWineId(int user_id, int wine_id) {
        // 유저의 모든 리뷰 중 해당 와인에 대한 리뷰 반환
        List<Review> reviews = reviewRepository.findAllReviewsByUserIdAndWineId(user_id, wine_id);

        List<ReviewResponseDto> reviewResponseDtos = new ArrayList<>();

        for (Review review : reviews) {
            reviewResponseDtos.add(ReviewResponseDto.of(review));
        }

        return reviewResponseDtos;
    }

    public List<Review> myReviewList(int userId) {
        List<Review> reviewList = reviewRepository.myReviewList(userId);
        return reviewList;
    }

    public List<Review> myRecommendReviewList(int userId) {
        List<Review> reviewList = reviewRepository.myRecommendReviewList(userId);
        return reviewList;
    }

    public List<RefResponseDto> myReflist(int userId) {
        List<Wine> wineList = wineRepository.myReflist(userId);
        List<RefResponseDto> refList = new ArrayList<>();
        for (Wine wine : wineList) {
            refList.add(RefResponseDto.of(wine));
        }
        return refList;
    }
}

