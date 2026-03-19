package com.recruitify.webapi.common.services;

import java.util.Base64;
import io.imagekit.sdk.models.results.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.models.FileCreateRequest;

@Service
public class ImageUploadService {
    @Autowired
    private ImageKit imageKit;

    private String uploadImage(MultipartFile file) {
        // convert String to base64
        try {
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());

            // create request
            FileCreateRequest fileCreateRequest = new FileCreateRequest(base64, file.getOriginalFilename());
            fileCreateRequest.setUseUniqueFileName(true);

            // upload
            Result result=ImageKit.getInstance().upload(fileCreateRequest);

            // trả về URL ảnh
            return result.getUrl();

        } catch (Exception e) {
            throw new RuntimeException("Upload ảnh thất bại", e);
        }
    }
}
