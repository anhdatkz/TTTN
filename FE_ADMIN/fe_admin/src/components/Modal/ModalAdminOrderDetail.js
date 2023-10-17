import { useState, useEffect } from 'react'
import apiConfigs from '../../api/apiConfigs'
import { VND, modalStyle } from '../../ultils/Format'
import style from "./Modal.module.css"

export default function ModalAdminOrderDetail(props) {

    const { hide, maddh } = props

    const [ctdh, setCTDH] = useState([])

    useEffect(() => {
        fetch(`${apiConfigs.baseUrl}/ctddh/${maddh}`)
            .then((res) => res.json())
            .then((data) => {
                setCTDH(data)
            })
    }, [])
    console.log(ctdh)
    return (
        <>
            <div className="modal show fade" style={modalStyle}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Đơn đặt hàng #{maddh}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Ảnh</th>
                                    <th>Đơn giá</th>
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
                                        <td>{VND.format(order.dongia)}</td>
                                        <td>{order.soluong}</td>
                                        <td className={style["modal-total"]}>{VND.format(order.tongtien)}</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className={style["modal-total"]}>Tổng tiền</td>
                                    <td className={style["modal-total"]}>{VND.format(ctdh.reduce((a, b) => {
                                        return a + b.tongtien
                                    }, 0))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
};
