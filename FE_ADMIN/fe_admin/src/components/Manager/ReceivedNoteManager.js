import { Fragment, useEffect, useState } from "react"
import style from "./Manager.module.css"
import apiConfig from "../../api/apiConfigs"
import { formatDate } from "../../ultils/Format"
import { FaPlusCircle } from "react-icons/fa"
import ModalSupplier from "../Modal/ModalSupplier"
import ModalAdminOrder from "../Modal/ModalAdminOrder"
import ModalAdminOrderDetail from "../Modal/ModalAdminOrderDetail"
import { roleName } from "../Login/Login"
import ModalAdminRecivedNoteDetail from "../Modal/ModalAdminRecivedNoteDetail"
import ModalAdminReceivedNote from "../Modal/ModalAdminReceivedNote"
import ModalReceivedNote from "../Modal/ModalReceivedNote"

export default function ReceivedNoteManager(props) {
    const [phieuNhaps, setPhieuNhaps] = useState([])
    const [datHangs, setDatHangs] = useState([])
    const [modal, setModal] = useState(false)
    const [action, setAction] = useState("")
    const [maddh, setMaDDH] = useState("")
    const [mapn, setMaPN] = useState("")
    console.log(roleName)

    const showModalAdd = () => {
        setAction("add")
        setModal(true)
    }

    const showModalDetail = (mapn) => {
        setAction("detail")
        setMaPN(mapn)
        setModal(true)
    }

    const showModalAddDetail = (maddh, mapn) => {
        setAction("add-detail")
        setMaPN(mapn)
        setMaDDH(maddh)
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
        console.log(modal)
    }

    useEffect(() => {
        fetch(`${apiConfig.baseUrl}/phieunhap`)
            .then((res) => res.json())
            .then((data) => {
                setPhieuNhaps(data)
                console.log(data)
            })
    }, [modal])

    return (
        <>
            <div className={style["manager"]}>
                <div className="employee">
                    <div className="employee-header d-flex justify-content-between">
                        <h2 className="title">Phiếu nhập</h2>
                        <button className="btn btn-primary" onClick={() => showModalAdd()}>Thêm</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Mã phiếu nhập</th>
                                <th>Mã DDH</th>
                                <th>Ngày nhập</th>
                                <th>Người lập</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {phieuNhaps.map((phieunhap) => (
                                <tr key={phieunhap.mapn}>
                                    <td>{phieunhap.mapn}</td>
                                    <td>{phieunhap.datHangPN.maddh}</td>
                                    <td>{formatDate(phieunhap.ngaynhap)}</td>
                                    <td>{phieunhap.nhanVienPN.hoten}</td>
                                    <td className={style["order-action"]}>
                                        <button className="btn btn-primary" onClick={() => showModalDetail(phieunhap.mapn)}>Chi tiết</button>
                                    </td>
                                    <td>
                                        <div className={style["order-add"]} onClick={() => showModalAddDetail(phieunhap.datHangPN.maddh, phieunhap.mapn)}><FaPlusCircle></FaPlusCircle></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* {modal === true ? <ModalSupplier hide={closeModal} action={action} /> : <Fragment />} */}
            {modal === true
                ? (action === "add"
                    ? <ModalReceivedNote hide={closeModal} action={action} />
                    : (action === "detail"
                        ? <ModalAdminRecivedNoteDetail hide={closeModal} action={action} mapn={mapn}></ModalAdminRecivedNoteDetail>
                        : <ModalAdminReceivedNote hide={closeModal} action={action} maddh={maddh} mapn={mapn} />))
                : <Fragment />
            }
        </>
    )
};
