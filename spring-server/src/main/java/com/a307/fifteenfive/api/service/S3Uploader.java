package com.a307.fifteenfive.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    // Multipart file 을 file 로 변환  dirName = static
    public String upload(MultipartFile multipartFile, String dirName, String customFileName) throws IOException {
        File uploadFile = convert(multipartFile, customFileName)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));

        return upload(uploadFile, dirName);
    }

    // file 을 업로드
    private String upload(File uploadFile, String dirName) {
        String fileNameDir = dirName + "/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileNameDir);
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    // file 을 삭제
    public String disload(String fileNameDir) {
        return deleteS3(fileNameDir);
    }

    private String putS3(File uploadFile, String fileNameDir) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileNameDir, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));

        return amazonS3Client.getUrl(bucket, fileNameDir).toString();
    }

    private String deleteS3(String fileNameDir) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileNameDir));

        return amazonS3Client.getUrl(bucket, fileNameDir).toString();
    }

    // 로컬(서버경로)에 저장된 파일을 삭제
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file, String customFileName) throws IOException {

        // 파일이름 중복 에러를 피하기 위한 커스텀 이름
        File convertFile = new File(customFileName);
//        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }
}