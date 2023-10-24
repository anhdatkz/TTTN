package com.example.payload;

public class MessageError {
	/*Login validation*/
	public static final String USERNAME_EMPTY_ERROR =  "ERROR_USERNAME001";//Tên đăng nhập không được bỏ trống
	public static final String USERNAME_EXIST_ERROR =  "ERROR_USERNAME002";//Tên đăng nhập không được bỏ trống
	
	public static final String PASS_STRING_LARGE = "ERROR_PASS002";//Độ dài mật khẩu vượt quá 20 ký tự
	public static final String PASS_STRING_NOT_ENOUGH = "ERROR_PASS003";//Độ dài mật khẩu ít nhất 6 ký tự
	public static final String PASS_STRING_EMPTY = "ERROR_PASS001";// Mật khẩu không được bỏ trống
	public static final String FAIL_LOGIN = "ERROR_LOGIN001";//Tên đăng nhập hoặc mật khẩu không chính xác
	public static final String SUCCESS_LOGIN = "SUCCESS_LOGIN";// Đăng nhập thành công
	
	
	public static final String CHANGE_STATUS_SUCCESS = "CHANGE_STATUS_SUCCESS";// CHUYỂN TRẠNG THÁI THÀNH CÔNG
	public static final String CHANGE_STATUS_FAIL = "CHANGE_STATUS_FAIL";// CHUYỂN TRẠNG THÁI THÀNH CÔNG
	
	/**lable validation*/
    public static final String REQUIRED_FIELD = "ERR001"; // Lỗi Bỏ trống
    public static final String INVALID_FORMAT = "ERR002";	// Lỗi for
    public static final String EXCEEDS_MAX_LENGTH = "ERR003";// Lỗi vượt quá số ký tự cho phép
    public static final String BELOW_MIN_LENGTH = "ERR004"; // Lỗi ký tự tối thiểu
    public static final String SPECIAL_CHARACTERS = "ERR005"; // Lỗi ký tự đặc biệt
    public static final String EXIST_INFORMATION = "ERR00EXIST"; // Lỗi ký tự đặc biệt
    public static final String OPERATION_SUCCESS = "SUCCESS_OPERATION"; // Lỗi ký tự đặc biệt
    public static final String OPERATION_FAIL = "FAIL_OPERATION"; // Lỗi ký tự đặc biệt
    
    
    /**Rate validation */
    public static final String VALIDATE_DOUBLE_RATE = "DOUBLE_RATE_ERR001"; // LỖI KHÔNG THỂ ĐÁNH GIÁ SẢN PHẨM NHIỀU HƠN 1 LẦN
    public static final String VALIDATE_RATE_PRODUCT = "BLOCK_RATE_ERR001"; // LỖI KHÔNG THỂ ĐÁNH GIÁ SẢN PHẨM CHƯA MUA
    public static final String RATE_SUCCESS = "RATE_SUCCESS"; // Lỗi ký tự đặc biệt
    
    
	
	
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
        case MessageError.USERNAME_EXIST_ERROR:
            return "Tên đăng nhập đã được sử dụng!";    
        case MessageError.FAIL_LOGIN:
            return "Tên đăng nhập hoặc mật khẩu không chính xác nhé!";
        case MessageError.SUCCESS_LOGIN:
            return "Đăng nhập thành công !";
        case MessageError.PASS_STRING_LARGE:
            return "Độ dài mật khẩu vượt quá 20 ký tự!";
        case MessageError.PASS_STRING_NOT_ENOUGH:
            return "Độ dài mật khẩu ít nhất 6 ký tự!";
        case MessageError.PASS_STRING_EMPTY:
            return "Mật khẩu đăng nhập không được bỏ trống!";
        case MessageError.CHANGE_STATUS_SUCCESS:
            return "Cập nhật trạng thái đơn hàng thành công!";
        case MessageError.CHANGE_STATUS_FAIL:
            return "Cập nhật trạng thái đơn hàng thất bại!";
        case MessageError.VALIDATE_RATE_PRODUCT:
            return "Bạn chưa từng mua sản phẩm này!";
        case MessageError.VALIDATE_DOUBLE_RATE:
            return "Bạn không thể đánh giá một sản phẩm 2 lần!";
        case MessageError.RATE_SUCCESS:
            return "Đánh giá sản phẩm thành công!";
            case MessageError.EXIST_INFORMATION:
            return "Dữ liệu nhập đã tồn tại!";
        case MessageError.OPERATION_SUCCESS:
            return "Thao tác thành công!";
        case MessageError.OPERATION_FAIL:
            return "Thao tác thất bại!";
            
        
        default:
            return "Another error occurred.";
	    }
	}
}
