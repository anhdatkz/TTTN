const loginValidations = {
    VALIDATION_USERNAME_E001: "Tên đăng nhập không được rỗng",
    VALIDATION_USERNAME_E002: "Tên đăng nhập viết liền không dấu",
    VALIDATION_USERNAME_E003: "Tên đăng nhập ít hơn 20 ký tự",
    VALIDATION_PASS_E001: "Mật khẩu không được rỗng",
    VALIDATION_PASS_E002: "Mật khẩu phải ít hơn 20 ký tự",
    VALIDATION_PASS_E003: "Mật khẩu phải viết liền không dấu"
}

const registerValidations = {

}

const brandValidations = {
    VALIDATION_BRAND_ID: "Mã hãng không được rỗng",
    VALIDATION_BRAND_NAME: "Tên hãng không được rỗng",
    VALIDATION_BRAND_IMG: "Link ảnh hãng không được rỗng",
}
const productValidations = {
    VALIDATION_PRODUCT_ID: "Mã sản phẩm không được rỗng",
    VALIDATION_PRODUCT_NAME: "Tên sản phẩm không được rỗng",
    VALIDATION_PRODUCT_IMG: "Link ảnh sản phẩm không được rỗng",
    VALIDATION_PRODUCT_OS: "Hệ điều hành không được rỗng",
    VALIDATION_PRODUCT_PIN: "Dung lượng pin không được rỗng",
    VALIDATION_PRODUCT_SCREEN: "Thông tin màn hình không được rỗng",
    VALIDATION_PRODUCT_PRICE: "Giá không được rỗng",
    VALIDATION_PRODUCT_WARRANTY: "Thời gian bảo hành không được rỗng",
}

const orderValidations = {

}

const supplierValidations = {
    VALIDATION_SUPPLIER_ORDER: "Mã đặt hàng không được rỗng"
}

const receivedNoteValidations = {
    VALIDATION_RECEIVED_NOTE: "Mã phiếu nhập không được rỗng"
}

export {
    loginValidations,
    registerValidations,
    brandValidations,
    productValidations,
    orderValidations,
    supplierValidations,
    receivedNoteValidations
}