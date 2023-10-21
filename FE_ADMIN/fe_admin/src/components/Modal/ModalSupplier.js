import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import apiConfig from "../../api/apiConfigs"
import { useFormik } from 'formik';
import * as Yup from "yup"
import style from "./Modal.module.css"
import { getDate, modalStyle } from "../../ultils/Format";
import { scrollTop } from "../../App";
import { manvLogin } from "../Login/Login";

export default function ModalSupplier(props) {
    const { hide, action, maloai } = props

    const [nhaccs, setNhaccs] = useState([])

    let maddhRef = useRef("")
    let nhaccRef = useRef("")

    // lấy thông tin hãng
    useEffect(() => {
        fetch(`${apiConfig.baseUrl}/nhacc`)
            .then((res) => res.json())
            .then((data) => {
                setNhaccs(data)
                console.log(data)
            })
    }, [])


    const formik = useFormik({
        initialValues: {
            maddh: "",
            nhacc: "",
            ngaylap: "",
            nguoilap: ""
        },
        validationSchema: Yup.object({
            maddh: Yup.string()
                .required("Mã đơn đặt hàng không được rỗng!"),
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
            maddh: maddhRef.current.value.trim(),
            ngaylap: getDate(),
            manvlap: manvLogin,
            manhacc: nhaccRef.current.value.trim()
        }

        if (maddhRef.current.value.trim() === "") {
            toast.error("Vui lòng nhập mã đơn đặt hàng!", {
                position: "top-center"
            })
        } else {
            fetch(`${apiConfig.baseUrl}/dathang`, {
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
                            <h5 className="modal-title">Đặt hàng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Mã DDH</label>
                                <input ref={maddhRef} type="text" className="form-control" placeholder="Mã DDH"
                                    name='maddh' onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                {formik.touched.maddh && formik.errors.maddh ? (
                                    <div className={style["validate"]}>{formik.errors.maddh}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label>Nhà cung cấp</label>
                                <select name="nhacc" id="nhacc" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} ref={nhaccRef} >
                                    {nhaccs.map((nhacc, index) => (
                                        <option value={nhacc.manhacc} key={index}>{nhacc.tenncc}</option>
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
