import "./Paypal.css"
import "../Cart/Cart.css"
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import apiConfig from '../../api/apiConfigs'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { clearCart, getTotals } from "../../features/cartSlice"
import { caculate, VND } from "../../ultils/Format"

function PayPal({ isCheckout }) {
    const paypal = useRef();
    const cart = useSelector((state) => state.cart)
    const cartItems = cart.cartItems
    const totalAmount = Number((parseInt(localStorage.getItem("totalAmount")) / 23500).toFixed(2))
    const [userInfo, setUserInfo] = useState({})
    const username = localStorage.getItem('username')
    let cmnd = ""
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const tenkhRef = useRef()
    const diachiRef = useRef()
    const emailRef = useRef()
    const sdtRef = useRef()


    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    useEffect(() => {
        fetch(`${apiConfig.baseUrl}/khachhang/profile`, {
            headers: {
                'Authorization': localStorage.getItem("token")
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserInfo(data)
                console.log("++++++++++")

                console.log(data)
                cmnd = data.cmnd
                // cartData = {
                //     ngaylap: today,
                //     tennguoinhan: data.tenkh,
                //     diachinhan: data.diachi,
                //     sdtnguoinhan: data.sdt,
                //     tongtien: localStorage.getItem("totalAmount"),
                //     matrangthai: 0,
                //     cmnd: data.cmnd
                // }
            })
        console.log("============")

        console.log(totalAmount)
    }, [dispatch])

    const handleSaveCart = async () => {
        const cartData = {
            ngaylap: today,
            tennguoinhan: tenkhRef.current.value,
            diachinhan: diachiRef.current.value,
            sdtnguoinhan: sdtRef.current.value,
            eamilnguoinhan: emailRef.current.value,
            tongtien: localStorage.getItem("totalAmount"),
            matrangthai: 1,
            cmnd: userInfo.cmnd
            // cmnd: cmnd
        }

        console.log("************************")

        console.log(cartData)
        let response = await fetch(`${apiConfig.baseUrl}/donhang`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData),
        })

        let madh = await response.json()
        console.log('ĐÃ CHẠY TỚI ĐÂY');
        console.log('Giỏ hàng:', madh);
        cartItems.forEach((cartItem) => {
            let cartDetailData = {
                id: {
                    madhctdh: madh,
                    maloaictdh: cartItem.maloai
                },
                soluong: cartItem.cartQuantity,
                tonggia: cartItem.total
            }

            fetch(`${apiConfig.baseUrl}/ctdh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartDetailData),
            })
                .then((response) => {
                    if (response) {
                        return response.json()
                    }
                })
                .then((data) => {
                    // let cartDetailID = {
                    //     idgiohangctgh: localStorage.getItem("cartId"),
                    //     maloaictgh: cartItem.maloai
                    // }

                    // fetch(`${apiConfig.baseUrl}/ctgh`, {
                    //     method: 'DELETE',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify(cartDetailID),
                    // })
                    console.log('CTDH:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });


        localStorage.setItem("totalAmount", 0)
    }

    const handleClearCart = () => {
        cartItems.forEach((cartItem) => {
            let cartDetailID = {
                idgiohangctgh: localStorage.getItem("cartId"),
                maloaictgh: cartItem.maloai
            }

            fetch(`${apiConfig.baseUrl}/ctgh`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartDetailID),
            })
        })
    }

    const handleSubmit = async () => {
        handleSaveCart()
        handleClearCart()
        dispatch(clearCart())
        navigate("/")
        toast.success("Đặt hàng thành công!", {
            position: "top-center"
        })
    }

    // useEffect(() => {
    //     window.paypal
    //         .Buttons({
    //             createOrder: (data, actions, err) => {
    //                 return actions.order.create({
    //                     intent: "CAPTURE",
    //                     purchase_units: [
    //                         {
    //                             description: "Cool looking table",
    //                             amount: {
    //                                 currency_code: "USD",
    //                                 value: totalAmount,
    //                             },
    //                         },
    //                     ],
    //                 });
    //             },
    //             onApprove: async (data, actions) => {
    //                 handleSaveCart()
    //                 const order = await actions.order.capture();
    //                 console.log(order);
    //                 handleClearCart()
    //                 dispatch(clearCart())
    //                 navigate("/")
    //                 toast.success("Đặt hàng thành công!", {
    //                     position: "top-center"
    //                 })
    //             },
    //             onError: (err) => {
    //                 console.log(err);
    //                 toast.error("Đặt hàng thất bại!", {
    //                     position: "top-center"
    //                 })
    //             },
    //         })
    //         .render(paypal.current);
    // }, [paypal, dispatch]);

    return (
        <>
            <div className="checkout">
                <div className="customer">
                    <div className="customer-info">
                        <div className="delivery-address">
                            <h4>Địa chỉ nhận hàng</h4>
                            <span>Họ tên</span><input type="text" className="form-control" defaultValue={userInfo.tenkh} ref={tenkhRef} />
                            <span>Địa chỉ</span><input type="text" className="address form-control" defaultValue={userInfo.diachi} ref={diachiRef} />
                            <span>Số điện thoại</span><input type="text" className="phone form-control" defaultValue={userInfo.sdt} ref={sdtRef} />
                            <span>Email</span><input type="email" className="email form-control" defaultValue={userInfo.email} ref={emailRef} />
                        </div>
                        <div className="delivery-mode">
                            <h4>Hình thức giao hàng</h4>
                            <div><span>Giao hàng Tiết Kiệm</span></div>
                            <div><span>Miễn phí vận chuyển</span></div>
                        </div>
                        <div className="delivery-mode">
                            <h4>Hình thức thanh toán</h4>
                            <div><span>Thanh toán khi nhận hàng</span></div>
                        </div>
                    </div>
                </div>
                <div className="cart">
                    <h5>Chi tiết đơn hàng</h5>
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Ảnh</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.tenloai}</td>
                                            <td><img src={item.anh} alt="" className="cart-item-img" /></td>
                                            <td>{item.giamgia.length == 0 ? (VND.format(item.gia)) : (VND.format(item.gia - item.gia * item.giamgia[0].phantram / 100))}</td>
                                            <td>
                                                <span className="btn btn-info"> {item.cartQuantity} </span>
                                            </td>
                                            <td>{VND.format(item.total)}</td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="fw-bold">Tổng thanh toán</td>
                                    <td className="fw-bold"> {VND.format(cartItems.reduce((acc, cur) => {
                                        return acc + cur.total
                                    }, 0))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div >
                <div className="paypal">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Xác nhận đặt hàng</button>
                    {/* <div ref={paypal}></div> */}
                </div>
            </div>
        </>
    )
}

export default PayPal