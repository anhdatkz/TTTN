import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import apiConfig from "../../api/apiConfigs"
import { useFormik } from 'formik';
import * as Yup from "yup"
import style from "./Modal.module.css"
import { getDate, modalStyle } from "../../ultils/Format";
import { scrollTop } from "../../App";

export default function ModalAdminOrder(props) {
    const { hide, action, maddh, manhacc } = props
    const [lsp, setLSP] = useState([])

    let maloaiRef = useRef("")
    let soluongRef = useRef(0)
    let dongiaRef = useRef(0)
    // lấy thông tin hãng
    useEffect(() => {
        fetch(`${apiConfig.baseUrl}/lspnhacc/${manhacc}`)
            .then((res) => res.json())
            .then((data) => {
                setLSP(data)
                console.log(data)
            })
    }, [])


    const formik = useFormik({
        initialValues: {
            soluong: 0,
            dongia: 0
        },
        validationSchema: Yup.object({
            dongia: Yup.number()
                .min(1, "Giá phải lớn hơn 0")
                .required("Giá không được rỗng!"),
            soluong: Yup.number()
                .min(1, "Số lượng phải lớn hơn 0")
                .required("Số lượng không được rỗng!"),
        }),
        onSubmit: (values) => {
            handleAdd()

            scrollTop()
        }
    })
    const handleAdd = () => {
        const formData = {
            maddh: maddh.trim(),
            maloai: maloaiRef.current.value.trim(),
            soluong: soluongRef.current.value.trim(),
            dongia: dongiaRef.current.value.trim()
        }

        fetch(`${apiConfig.baseUrl}/ctddh`, {
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
                    hide()
                }
                else {
                    toast.warn(data.message, {
                        position: "top-center"
                    })
                }
                // hide()
            })
            .catch((error) => {
                toast.error("Thất bại, Xin kiểm tra lại", {
                    position: "top-center"
                })
                console.error('Error:', error);
                // hide()
            });
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="modal show fade" style={modalStyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm chi tiết đặt hàng {maddh}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Tên sản phẩm</label>
                                    <select name="tensp" id="tensp" className="form-control" ref={maloaiRef} >
                                    {lsp.map((sp, index) => (
                                        <option value={sp.maloai} key={index}>{sp.tenloai}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                            <label>Số lượng</label>
                            <input ref={soluongRef} type="number" className="form-control" placeholder="Số lượng"
                                        name='soluong' onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                                    {formik.touched.soluong && formik.errors.soluong ? (
                                        <div className={style["validate"]}>{formik.errors.soluong}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label>Đơn giá</label>
                            <input ref={dongiaRef} type="number" className="form-control" placeholder="Đơn giá"
                                        name='dongia' onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                                    {formik.touched.dongia && formik.errors.dongia ? (
                                        <div className={style["validate"]}>{formik.errors.dongia}</div>
                            ) : null}
                        </div>
                        <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-primary" onClick={handleAdd}>Lưu</button> */}
                                    <button type="submit" className="btn btn-primary">Lưu</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </>
    )
};
