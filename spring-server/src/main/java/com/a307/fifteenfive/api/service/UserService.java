package com.a307.fifteenfive.api.service;

import com.a307.fifteenfive.api.requestDTO.DeleteUserRequestDto;
import com.a307.fifteenfive.api.requestDTO.ReviewRequestDto;
import com.a307.fifteenfive.api.requestDTO.UserRequestDto;
import com.a307.fifteenfive.db.entity.Review;
import com.a307.fifteenfive.db.entity.User;
import com.a307.fifteenfive.db.entity.Wine;
import com.a307.fifteenfive.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private S3Uploader s3Uploader;

    @Autowired UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, S3Uploader s3Uploader) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.s3Uploader = s3Uploader;
    }

    @Transactional
    public User signup(UserRequestDto signUpReq) {
        User user = User.builder()
                .userEmail(signUpReq.getUserEmail())
                .userNickname(signUpReq.getUserNickname())
                .userPassword(passwordEncoder.encode(signUpReq.getUserPassword()))
                .userProfileUrl(signUpReq.getUserProfileUrl())
                .userLifestyleCode(signUpReq.getUserLifestyleCode())
                .roles("ROLE_USER") // 권한 강제 부여
                .build();

        return userRepository.save(user);
    }

    public User getUserByUserId(int id) {

        return userRepository.findUserByUserId(id);

    }

    public User getUserByUserEmail(String userEmail) {

        return userRepository.findUserByUserEmail(userEmail);

    }

    @Transactional
    public boolean deleteUser(DeleteUserRequestDto deleteUserReq, int id) {

        User user = userRepository.findUserByUserId(id);

        if(!passwordEncoder.matches(deleteUserReq.getPassword(), user.getUserPassword())) return false;

        userRepository.delete(user);
        return true;
    }

    @Transactional
    public boolean updateUserLifestyle(String userLifeStyleCode, User old_user) {


        if (userLifeStyleCode == null) {
            userLifeStyleCode = old_user.getUserLifestyleCode();
        }

        String imageUrl = old_user.getUserProfileUrl();
        String userNickname = old_user.getUserNickname();

        User updated_user = userBuilder(userLifeStyleCode, imageUrl, userNickname, old_user);
        updated_user.setUserId(old_user.getUserId());
        userRepository.save(updated_user);

        return true;
    }


    @Transactional
    public boolean updateUserDetail(MultipartFile multipartFile, String userNickname, User old_user) {

        UUID uuid = UUID.randomUUID();

        String imageUrl = null;
        if (old_user.getUserProfileUrl() != null) {
            imageUrl = old_user.getUserProfileUrl();
        }

        try{

            String old_file_name = old_user.getUserProfileUrl();

            if(!multipartFile.isEmpty())
            {
                if (old_file_name != null) {
                    s3Uploader.disload(old_file_name);
                }

                String uuid_str = uuid.toString();

                // custom file name
                String customFileName = uuid_str  + '-' + multipartFile.getOriginalFilename() ;
                imageUrl = s3Uploader.upload(multipartFile, "static", customFileName);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        if (userNickname == null) {
            userNickname = old_user.getUserNickname();
        }

        String userLifeStyleCode = old_user.getUserLifestyleCode();

        User updated_user = userBuilder(userLifeStyleCode, imageUrl, userNickname, old_user);
        updated_user.setUserId(old_user.getUserId());
        userRepository.save(updated_user);

        return true;
    }


    // user정보 와 이미지 url 을 user 로 빌드
    public User userBuilder(String userLifeStyleCode,  String imageUrl, String userNickname, User old_user) {

        return User.builder()
                .userEmail(old_user.getUserEmail())
                .userPassword(old_user.getUserPassword())
                .userLifestyleCode(userLifeStyleCode)
                .userNickname(userNickname)
                .userProfileUrl(imageUrl)
                .build();

    }
}
