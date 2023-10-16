import { Fragment, useEffect, useState } from "react"
import style from "./Manager.module.css"
import apiConfig from "../../api/apiConfigs"
import { formatDate } from "../../ultils/Format"
import { FaPlusCircle } from "react-icons/fa"
import ModalSupplier from "../Modal/ModalSupplier"

export default function SupplierManager(params) {
    const [datHangs, setDatHangs] = useState([])
    const [modal, setModal] = useState(false)
    const [action, setAction] = useState("")

    const showModalAdd = () => {
        setAction("add")
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
        console.log(modal)
    }

    useEffect(() => {
        fetch(`${apiConfig.baseUrl}/dathang`)
            .then((res) => res.json())
            .then((data) => {
                setDatHangs(data)
                console.log(data)
            })
    }, [modal])

    return (
        <>
            <div className={style["manager"]}>
                <div className="employee">
                    <div className="employee-header d-flex justify-content-between">
                        <h2 className="title">Đặt hàng</h2>
                        <button className="btn btn-primary" onClick={() => showModalAdd()}>Thêm</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Mã ĐĐH</th>
                                <th>Ngày lập</th>
                                <th>Nhà cung cấp</th>
                                <th>Người lập</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {datHangs.map((dathang) => (
                                <tr key={dathang.maddh}>
                                    <td>{dathang.maddh}</td>
                                    <td>{formatDate(dathang.ngaylap)}</td>
                                    <td>{dathang.nhaCCDH.tenncc}</td>
                                    <td>{dathang.nhanVienDH.hoten}</td>
                                    <td className={style["order-action"]}>
                                        <button className="btn btn-primary">Chi tiết</button>
                                    </td>
                                    <td>
                                        <div className={style["order-add"]}><FaPlusCircle></FaPlusCircle></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {modal === true ? <ModalSupplier hide={closeModal} action={action} /> : <Fragment />}
        </>
    )
};
