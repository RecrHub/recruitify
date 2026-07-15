package com.recruitify.webapi.common.service;

import java.util.Base64;
import io.imagekit.sdk.models.results.Result;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.models.FileCreateRequest;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageUploadService {
    @Autowired
    private ImageKit imageKit;

    public  String uploadImage(MultipartFile file, String foldeString , String companyName) {
        // convert String to base64
        try {
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());

            // create request
            FileCreateRequest fileCreateRequest = new FileCreateRequest(base64,"company_" + companyName + "_" + System.currentTimeMillis());
            fileCreateRequest.setFolder("/companies");

            // upload
            Result result=ImageKit.getInstance().upload(fileCreateRequest);
            log.info("Uploaded image to imageKit: {}", result.getUrl());
            // trả về URL ảnh
            return result.getUrl();

        } catch (Exception e) {
            throw new RuntimeException("Upload ảnh thất bại", e);
        }
    }
}
