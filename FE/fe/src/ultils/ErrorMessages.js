const loginMessages = {
    LOGIN_SUCCESS: "Đăng nhập thành công",
    LOGIN_E001: "Kiểm tra lại Tên đăng nhập và mật khẩu"
}

const registerMessages = {
    REGISTER_SUCCESS: "Đăng ký thành công",
    REGISTER_E001: "Đăng ký thất bại",
    REGISTER_E002: "Tên đăng nhập đã được sử dụng",
    REGISTER_E003: "CMND đã được sử dụng",
}


const orderMessage = {
    ORDER_SUCCESS: "Đơn hàng đã đặt thành công",
    ORDER_FAIL: "Đơn hàng thất bại",
    CANCLE_ORDER_SUCCESS: "Hủy đơn hàng thành công",
    CANCLE_ORDER_FAIL: "Hủy đơn hàng thất bại",
}

const rateMessage = {
    RATE_SUCCESS: "Cảm ơn bạn đã đánh giá sản phẩm",
    RATE_FAIL: "Đánh giá thất bại",
}

const cartMessage = {
    ADD_TO_CART_SUCCESS: "Thêm sản phẩm vào giỏ hàng thành công",
    DELETE_FROM_CART_SUCCESS: "Sản phẩm đã được xóa khỏi giỏ hàng",
    INCREASE_QUANTITY: "Tăng số lượng sản phẩm thành công",
    DECREASE_QUANTITY: "Giảm số lượng sản phẩm thành công",
    DECREASE_QUANTITY_FAIL: "Không thể giảm số lượng sản phẩm",
}

export {
    loginMessages,
    registerMessages,
    orderMessage,
    rateMessage,
    cartMessage
}