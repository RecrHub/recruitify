package com.recruitify.jobservice.dtos.Response;

import lombok.Data;

@Data
public class ResultPaginationResponse {
    private MetaResponse meta;
    private Object result;
}