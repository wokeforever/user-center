package com.example.usercenter.common;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * @Author：woke
 * @Date：2023/11/11
 */
public class ResultUtils {
    /**
     * 成功
     * @param data
     * @param <T>
     * @return
     */
    public static <T> BaseResponse<T> success(T data){
        return new BaseResponse<>(0,data,"");
    }

    /**
     * 失败
     * @param errorCode
     * @return
     */
    public static BaseResponse error(ErrorCode errorCode){
        return new BaseResponse(errorCode);
    }

    public static BaseResponse error(int code,String message,String description){
        return new BaseResponse<>(code,null ,message ,description);
    }
    public static BaseResponse error(ErrorCode errorCode,String message,String description){
        return new BaseResponse<>(errorCode.getCode(),null ,message ,description);
    }
    public static BaseResponse error(ErrorCode errorCode,String description){
        return new BaseResponse<>(errorCode.getCode(),null ,errorCode.getMessage() ,description);
    }
}
