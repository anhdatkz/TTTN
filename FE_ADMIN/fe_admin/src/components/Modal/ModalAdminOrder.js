import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import apiConfig from "../../api/apiConfigs"
import { useFormik } from 'formik';
import * as Yup from "yup"
import style from "./Modal.module.css"
import { getDate, modalStyle } from "../../ultils/Format";
import { scrollTop } from "../../App";

export default function ModalAdminOrder(props) {
    const { hide, action, maddh } = props
    const [lsp, setLSP] = useState([])

    let maloaiRef = useRef("")
    let soluongRef = useRef(0)
    let dongiaRef = useRef(0)
    // lấy thông tin hãng
    useEffect(() => {
        fetch(`${apiConfig.baseUrl}/nhacc`)
            .then((res) => res.json())
            .then((data) => {
                setLSP(data)
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
                .required("Mã loại không được rỗng!"),
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
            maddh: maddh,
            maloai: maloaiRef.current.value.trim(),
            soluong: soluongRef.current.value.trim(),
            dongia: dongiaRef.current.value.trim()
        }

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
                                <label>Tên sản phẩm</label>
                                <select name="tensp" id="tensp" className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} ref={maloaiRef} >
                                    {lsp.map((sp, index) => (
                                        <option value={sp.manhacc} key={index}>{sp.tenncc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Số lượng</label>
                            <input ref={soluongRef} type="number" className="form-control" placeholder="Số lượng"
                                name='maddh' onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.mahang && formik.errors.mahang ? (
                                <div className={style["validate"]}>{formik.errors.mahang}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label>Đơn giá</label>
                            <input ref={dongiaRef} type="number" className="form-control" placeholder="Đơn giá"
                                name='maddh' onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.mahang && formik.errors.mahang ? (
                                <div className={style["validate"]}>{formik.errors.mahang}</div>
                            ) : null}
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
