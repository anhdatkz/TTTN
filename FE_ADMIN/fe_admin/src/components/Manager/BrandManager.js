import style from "./Manager.module.css"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { useState, useEffect, Fragment, useCallback } from 'react'
import apiConfigs from "../../api/apiConfigs"
import ModalBrand from "../Modal/ModalBrand"
import apiConfig from "../../api/apiConfigs"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function BrandManager() {

    const [hangs, setHangs] = useState([])
    const [modal, setModal] = useState(false)
    const [action, setAction] = useState("")
    const [mahang, setMaHang] = useState("")

    const handleGetHang = async () => {
        await fetch(`${apiConfigs.baseUrl}/hang`)
            .then((res) => res.json())
            .then((data) => {
                setHangs(data)
            })
    }

    useEffect(() => {
        handleGetHang()
    }, [modal])
    console.log(hangs)

    const showModalAdd = () => {
        setAction("add")
        setModal(true)
    }

    const showModalEdit = (mahang) => {
        setAction("edit")
        setMaHang(mahang.trim())
        console.warn(mahang)
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
        console.log(modal)
    }

    const handleDelete = (mahang) => {
        fetch(`${apiConfig.baseUrl}/hang/${mahang}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem("token")
            },
        })
            .then(res => res.json())
            .then((data) => {
                if (data === true) {
                    toast.success("Xóa thành công!", {
                        position: "top-center"
                    })
                }
                else {
                    toast.warn("Hãng hiện đang có sản phẩm! Không thể xóa!", {
                        position: "top-center"
                    })
                }
                handleGetHang()
            })
    }

    return (
        <>
            <div className={style["manager"]}>
                <div className="brand">
                    <div className="brand-header d-flex justify-content-between">
                        <h2 className="title">Hãng</h2>
                        <button className="btn btn-primary" onClick={() => showModalAdd()}>Thêm</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã hãng</th>
                                <th>Ảnh</th>
                                <th>Tên hãng</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hangs.map((hang, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{hang.mahang}</td>
                                    <td><img className={style["brand-img-manager"]} src={hang.anh} alt="" /></td>
                                    <td>{hang.tenhang}</td>
                                    <td>
                                        <div className={`${style["action"]} ${style["edit"]}`} onClick={() => showModalEdit(hang.mahang)}><FaEdit /></div>
                                    </td>
                                    <td><div className={`${style["action"]} ${style["delete"]}`} onClick={() => handleDelete(hang.mahang)}><FaTrashAlt /></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {modal === true ? <ModalBrand hide={closeModal} mahang={mahang} action={action} /> : <Fragment />}
        </>
    )
}

export default BrandManager