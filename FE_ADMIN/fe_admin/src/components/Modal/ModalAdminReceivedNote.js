import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import apiConfig from "../../api/apiConfigs"
import { useFormik } from 'formik';
import * as Yup from "yup"
import style from "./Modal.module.css"
import { getDate, modalStyle } from "../../ultils/Format";
import { scrollTop } from "../../App";


export default function ModalAdminReceivedNote(props) {
    const { hide, action, maddh, mapn } = props
    const [ctddhs, setCTDDHs] = useState([])
    const [soluong, setSoLuong] = useState(0)
    const [dongia, setDongia] = useState(0)

    let maloaiRef = useRef("")
    let soluongRef = useRef(0)
    let dongiaRef = useRef(0)


    const formik = useFormik({
        initialValues: {
            mapn: "",
            maloai: "",
            soluong: 0,
            dongia: 0
        },
        validationSchema: Yup.object({
            mapn: Yup.string()
                .required("Mã loại không được rỗng!"),
        }),
        onChange: (value) => {

        },
        onSubmit: (values) => {
            console.log("SUBMIT")
            const formData = {
            }

            scrollTop()
        }
    })

    const handleChangeCTDDH = (maloai) => {
        let ctddh = ctddhs.find(ctddh => {
            return ctddh.maloai.trim() === maloai
        })

        setSoLuong(ctddh.soluong)
        setDongia(ctddh.dongia)
        console.error(ctddh)
    }
    const handleAdd = () => {
        const formData = {
            mapn: mapn.trim(),
            maloai: maloaiRef.current.value.trim(),
            soluong: soluongRef.current.value.trim(),
            dongia: dongiaRef.current.value.trim()
        }

        fetch(`${apiConfig.baseUrl}/ctpn`, {
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

    // lấy thông tin ddh
    useEffect(() => {
        fetch(`${apiConfig.baseUrl}/ctddh/${maddh}`)
            .then((res) => res.json())
            .then((data) => {
                setCTDDHs(data)
                console.log(data)
            })
    }, [])

    return (
        <>
            <div className="modal show fade" style={modalStyle}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Phiếu nhập #{mapn}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Tên sản phẩm</label>
                                <select name="tensp" id="tensp" className="form-control" onChange={() => handleChangeCTDDH(maloaiRef.current.value.trim())} onBlur={formik.handleBlur} ref={maloaiRef} >
                                    <option>Loại sản phẩm</option>
                                    {ctddhs.map((ctddh, index) => (
                                        <option value={ctddh.maloai} key={index}>{ctddh.tenloai}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Số lượng</label>
                                <input ref={soluongRef} type="number" className="form-control" placeholder="Số lượng" value={soluong} readOnly
                                    name='maddh' onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                {formik.touched.mahang && formik.errors.mahang ? (
                                    <div className={style["validate"]}>{formik.errors.mahang}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label>Đơn giá</label>
                                <input ref={dongiaRef} type="number" className="form-control" placeholder="Đơn giá" value={dongia} readOnly
                                    name='maddh' onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                {formik.touched.mahang && formik.errors.mahang ? (
                                    <div className={style["validate"]}>{formik.errors.mahang}</div>
                                ) : null}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleAdd}>Nhập</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
