package com.example.payload;

public class MessageError {
	/*Login validation*/
	public static final String USERNAME_EMPTY_ERROR =  "ERROR_USERNAME001";//Tên đăng nhập không được bỏ trống
	public static final String PASS_STRING_LARGE = "ERROR_PASS002";//Độ dài mật khẩu vượt quá 20 ký tự
	public static final String PASS_STRING_NOT_ENOUGH = "ERROR_PASS003";//Độ dài mật khẩu ít nhất 6 ký tự
	public static final String PASS_STRING_EMPTY = "ERROR_PASS001";// Mật khẩu không được bỏ trống
	public static final String FAIL_LOGIN = "ERROR_LOGIN001";//Tên đăng nhập hoặc mật khẩu không chính xác
	public static final String SUCCESS_LOGIN = "SUCCESS_LOGIN";// Đăng nhập thành công
	
    public static final String REQUIRED_FIELD = "ERR001"; // Lỗi Bỏ trống
    public static final String INVALID_FORMAT = "ERR002";	// Lỗi for
    public static final String EXCEEDS_MAX_LENGTH = "ERR003";// Lỗi quá ký tự
    public static final String BELOW_MIN_LENGTH = "ERR004"; // Lỗi ký tự tối thiểu
    public static final String SPECIAL_CHARACTERS = "ERR005"; // Lỗi ký tự đặc biệt
	
	
	public static String getMessageEror(String errorCode){
	    switch (errorCode) {
        case MessageError.REQUIRED_FIELD:
            return "Thông tin không được bỏ trống!";
        case MessageError.INVALID_FORMAT:
            return "Thông tin được nhập không sai định dạng!";
        case MessageError.EXCEEDS_MAX_LENGTH:
            return "Thông tin nhập quá số ký tự cho phép!";
        case MessageError.SPECIAL_CHARACTERS:
            return "Thông tin nhập chứa ký tự đặc biệt không hợp lệ!";
        case MessageError.USERNAME_EMPTY_ERROR:
            return "Tên đăng nhập không được bỏ trống!";
        case MessageError.FAIL_LOGIN:
            return "Tên đăng nhập hoặc mật khẩu không chính xác!";
        case MessageError.SUCCESS_LOGIN:
            return "Đăng nhập thành công!";
        case MessageError.PASS_STRING_LARGE:
            return "Độ dài mật khẩu vượt quá 20 ký tự!";
        case MessageError.PASS_STRING_NOT_ENOUGH:
            return "Độ dài mật khẩu ít nhất 6 ký tự!";
        case MessageError.PASS_STRING_EMPTY:
            return "Mật khẩu đăng nhập không được bỏ trống!";    
        default:
            return "Another error occurred.";
	    }
	}
}
