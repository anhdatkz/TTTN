import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import apiConfig from "../../api/apiConfigs"
import { useFormik } from 'formik';
import * as Yup from "yup"
import style from "./Modal.module.css"
import { getDate, modalStyle } from "../../ultils/Format";
import { scrollTop } from "../../App";
import { manvLogin } from "../Login/Login";

export default function ModalReceivedNote(props) {
    const { hide, action, maloai } = props

    const [datHangs, setDatHangs] = useState([])

    let maddhRef = useRef("")
    let mapnRef = useRef("")

    // lấy thông tin hãng
    useEffect(() => {
        fetch(`${apiConfig.baseUrl}/dathang`)
            .then((res) => res.json())
            .then((data) => {
                setDatHangs(data)
                console.log(data)
            })
    }, [])


    const formik = useFormik({
        initialValues: {
            mapn: "",
            maddh: "",
            ngaynhap: "",
            nguoilap: ""
        },
        validationSchema: Yup.object({
            mapn: Yup.string()
                .required("Mã phiếu nhập không được rỗng!"),
        }),
        onSubmit: (values) => {
            console.log("SUBMIT")
            const formData = {
            }

            scrollTop()
        }
    })
    const handleAdd = () => {
        const formData = {
            mapn: mapnRef.current.value.trim(),
            maddh: maddhRef.current.value.trim(),
            ngaylap: getDate(),
            manvnhap: manvLogin,
        }

        if (mapnRef.current.value.trim() === "") {
            toast.error("Vui lòng nhập mã phiếu nhập!", {
                position: "top-center"
            })
        } else {
            fetch(`${apiConfig.baseUrl}/phieunhap`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
                body: JSON.stringify(formData),
            })
                .then((response) => (response.json()))
                .then((data) => {
                    console.log(data);
                    if (data.success === true) {
                        toast.success(data.message, {
                            position: "top-center"
                        })
                    }
                    else {
                        toast.warn(data.message, {
                            position: "top-center"
                        })
                    }
                    hide()
                })
                .catch((error) => {
                    toast.error("Tạo đơn đặt hàng thất bại", {
                        position: "top-center"
                    })
                    console.error('Error:', error);
                    hide()
                });
        }


    }

    console.log("========================")
    console.log(formik.values)

    return (
        <>
            <div className="modal show fade" style={modalStyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Phiếu nhập</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Mã phiếu nhập</label>
                                <input ref={mapnRef} type="text" className="form-control" placeholder="Mã phiếu nhập"
                                    name='mapn' onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                {formik.touched.mapn && formik.errors.mapn ? (
                                    <div className={style["validate"]}>{formik.errors.mapn}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label>Đơn đặt hàng</label>
                                <select name="nhacc" id="nhacc" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} ref={maddhRef} >
                                    {datHangs.map((dathang, index) => (
                                        <option value={dathang.maddh} key={index}>{dathang.maddh}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleAdd}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
