package com.recruitify.webapi.api.pages.admin.accountmanagement.service;

import com.recruitify.webapi.api.pages.admin.accountmanagement.dto.request.CreateHrRequest;
import com.recruitify.webapi.common.vo.MessageResponse;

public interface IAccountManagementService {

    MessageResponse createHrAccount(CreateHrRequest request);
}
