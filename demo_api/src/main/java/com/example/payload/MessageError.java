package com.example.payload;

public class MessageError {
	enum Error{
		JOB_NAME_INPUT_ERROR,
		VALIDATION_USERNAME_E001,
		VALIDATION_PASS_E001,
		VALIDATION_PASS_E002,
		
		/* Lỗi Bỏ trống ô nhập
		 * Lỗi nhập sai định dạng
		 * Lỗi nhập quá số lượng ký tự cho phép
		 * 
		 * 
		 * 
enum Size{
  SMALL, MEDIUM, LARGE, EXTRALARGE;

  public String getSize() {

    // sẽ tham chiếu đến đối tượng SMALL
    switch(this) {
      case SMALL:
        return "small";

      case MEDIUM:
        return "medium";

      case LARGE:
        return "large";

      case EXTRALARGE:
        return "extra large";

      default:
        return null;
      }
   }

  public static void main(String[] args) {

    // gọi phương thức getSize()
    // sử dụng đối tượng SMALL
    System.out.println("The size of the pizza is " + Size.SMALL.getSize());
  }
}*/
	}
}
