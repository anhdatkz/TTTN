import { useState, useEffect } from 'react'
import apiConfigs from '../../api/apiConfigs'
import { VND } from '../../ultils/Format'
import style from "./Modal.module.css"

function ModalUserOrderDetail(props) {
    const { hide, madh } = props

    console.log(madh)

    const [ctdh, setCTDH] = useState([])

    useEffect(() => {
        fetch(`${apiConfigs.baseUrl}/ctdh/${madh}`)
            .then((res) => res.json())
            .then((data) => {
                setCTDH(data)
            })
    }, [])
    console.log(ctdh)

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }


    return (
        <>
            <div className="modal show fade" style={modalStyle}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Chi tiết đơn hàng #{madh}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Ảnh</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ctdh.map((order) => (
                                    <tr key={order.tenloai}>
                                        <td>{order.tenloai}</td>
                                        <td><img src={order.anh} alt="" className={style["order-item-img"]} /></td>
                                        <td>{VND.format(order.gia)}</td>
                                        <td>{order.soluong}</td>
                                        <td className="order-total">{VND.format(order.tong)}</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="order-total">Tổng tiền</td>
                                    <td className="order-total">{VND.format(ctdh.reduce((a, b) => {
                                        return a + b.tong
                                    }, 0))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalUserOrderDetail