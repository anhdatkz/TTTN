const loginValidations = {
    VALIDATION_USERNAME_E001: "Tên đăng nhập không được rỗng",
    VALIDATION_USERNAME_E002: "Tên đăng nhập viết liền không dấu",
    VALIDATION_USERNAME_E003: "Tên đăng nhập ít hơn 20 ký tự",
    VALIDATION_PASS_E001: "Mật khẩu không được rỗng",
    VALIDATION_PASS_E002: "Mật khẩu phải ít hơn 20 ký tự",
    VALIDATION_PASS_E003: "Mật khẩu phải viết liền không dấu"
}

const registerValidations = {
    VALIDATION_USERNAME_E001: "Tên đăng nhập không được rỗng",
    VALIDATION_USERNAME_E002: "Tên đăng nhập viết liền không dấu",
    VALIDATION_USERNAME_E003: "Tên đăng nhập ít hơn 20 ký tự",
    VALIDATION_PASS_E001: "Mật khẩu không được rỗng",
    VALIDATION_PASS_E002: "Mật khẩu phải ít hơn 20 ký tự",
    VALIDATION_PASS_E003: "Mật khẩu phải viết liền không dấu",
    VALIDATION_CMND_01: "CMND không được rỗng!",
    VALIDATION_CMND_02: "CMND chỉ chứa số!",
    VALIDATION_NAME: "Họ tên không được rỗng!",
    VALIDATION_ADDRESS: "Địa chỉ không được rỗng!",
    VALIDATION_PHONENUMBER_01: "Số điện thoại không được rỗng!",
    VALIDATION_PHONENUMBER_02: "Số điện thoại phải là 10 số",
    VALIDATION_PHONENUMBER_03: "Số điện thoại không đúng",
    VALIDATION_EMAIL_01: "Email không đúng định dạng!",
    VALIDATION_EMAIL_02: "Email không được rỗng!",
}

const orderInfoValidations = {
    VALIDATION_NAME: "Họ tên không được rỗng!",
    VALIDATION_ADDRESS: "Địa chỉ không được rỗng!",
    VALIDATION_PHONENUMBER_01: "Số điện thoại không được rỗng!",
    VALIDATION_PHONENUMBER_02: "Số điện thoại phải là 10 số",
    VALIDATION_PHONENUMBER_03: "Số điện thoại không đúng",
    VALIDATION_EMAIL_01: "Email không đúng định dạng!",
    VALIDATION_EMAIL_02: "Email không được rỗng!",
}

export {
    loginValidations,
    registerValidations,
    orderInfoValidations
}