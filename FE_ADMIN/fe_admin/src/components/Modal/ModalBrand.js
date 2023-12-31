import { useState, useEffect, useRef } from 'react'
import style from './Modal.module.css'
import { toast } from 'react-toastify'
import apiConfigs from '../../api/apiConfigs'
import { useFormik } from 'formik';
import * as Yup from "yup"
import { brandValidations } from '../../ultils/ValidationMessages';

function ModalBrand(props) {
    const { hide, mahang, action } = props

    const [hang, setHang] = useState("")
    let maHangRef = useRef("")
    let anhRef = useRef("")
    let tenHangRef = useRef("")

    useEffect(() => {
        fetch(`${apiConfigs.baseUrl}/hang/${mahang}`)
            .then((res) => res.json())
            .then((data) => {
                setHang(data)
            })
    }, [])
    console.log(hang)

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }

    const formik = useFormik({
        initialValues: {
            mahang: "",
            anh: "",
            tenhang: ""
        },
        validationSchema: Yup.object({
            mahang: Yup.string()
                .required(brandValidations.VALIDATION_BRAND_ID),
            anh: Yup.string()
                .required(brandValidations.VALIDATION_BRAND_IMG),
            tenhang: Yup.string()
                .required(brandValidations.VALIDATION_BRAND_NAME),
        }),
        onSubmit: (values) => {
            if (action === "add") { handleAdd() }
            // if (action === "edit") { handleEdit() }
        }
    })



    const handleAddBrand = (data) => {
        fetch(`${apiConfigs.baseUrl}/hang`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(data),
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
                toast.error("Thêm hãng thất bại!", {
                    position: "top-center"
                })
                console.error('Error:', error);
                hide()
            });
    }
    const handleEditBrand = (data, mahang) => {
        fetch(`${apiConfigs.baseUrl}/hang/${mahang}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                response.json()
            })
            .then((data) => {
                toast.success("Chỉnh sửa thông tin thành công!", {
                    position: "top-center"
                })
                console.log('Success:', data);
                hide()
            })
            .catch((error) => {
                toast.error("Chỉnh sửa thất bại!", {
                    position: "top-center"
                })
                console.error('Error:', error);
                hide()
            });
    }

    const handleAdd = () => {

        let formData = {
            mahang: maHangRef.current.value.trim(),
            anh: anhRef.current.value.trim(),
            tenhang: tenHangRef.current.value.trim()
        }
        if (maHangRef.current.value.trim() === "") {
            toast.error("Thêm không thành công!", {
                position: "top-center"
            })
        } else {
            handleAddBrand(formData)
        }

        //console.log(formData)
    }

    const handleEdit = () => {
        // let mahang = document.querySelector('input[name="mahang"').value
        // let tenhang = document.querySelector('input[name="tenhang"').value
        if (tenHangRef.current.value.trim() === "" || anhRef.current.value.trim() == "") {
            toast.warn("Thông tin không được để trống!", {
                position: "top-center"
            })
        } else {
            let formData = {
                tenhang: tenHangRef.current.value.trim(),
                anh: anhRef.current.value.trim()
            }
            handleEditBrand(formData, mahang)
        }

    }
    return (
        <>
            {action === "add" ? (
                <form className={`${style["container"]} p-3`} onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="modal show fade" style={modalStyle}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Hãng</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Mã hãng</label>
                                    <input ref={maHangRef} type="text" className="form-control" placeholder="Mã hãng"
                                        name='mahang' onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {formik.touched.mahang && formik.errors.mahang ? (
                                        <div className={style["validate"]}>{formik.errors.mahang}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label>Ảnh</label>
                                    <input ref={anhRef} type="text" className="form-control" placeholder="Link ảnh"
                                        name='anh' onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {formik.touched.anh && formik.errors.anh ? (
                                        <div className={style["validate"]}>{formik.errors.anh}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label>Tên hãng</label>
                                    <input ref={tenHangRef} type="text" className="form-control" placeholder="Tên hãng"
                                        name='tenhang' onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {formik.touched.tenhang && formik.errors.tenhang ? (
                                        <div className={style["validate"]}>{formik.errors.tenhang}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-primary" onClick={handleAdd}>Lưu</button> */}
                                    <button type="submit" className="btn btn-primary">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            ) : (
                    // <form className={`${style["container"]} p-3`} onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="modal show fade" style={modalStyle}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Hãng</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Mã hãng</label>
                                    <input ref={maHangRef} type="text" className="form-control" placeholder="Mã hãng"
                                        name='mahang' defaultValue={hang.mahang} readOnly />
                                </div>

                                <div className="mb-3">
                                    <label>Ảnh</label>
                                    <input ref={anhRef} type="text" className="form-control" placeholder="Link ảnh"
                                        name='anh' defaultValue={hang.anh} onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                        {formik.touched.anh && formik.errors.anh ? (
                                            <div className={style["validate"]}>{formik.errors.anh}</div>
                                        ) : null}
                                </div>

                                <div className="mb-3">
                                    <label>Tên hãng</label>
                                    <input ref={tenHangRef} type="text" className="form-control" placeholder="Tên hãng"
                                        name='tenhang' defaultValue={hang.tenhang} onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                        {formik.touched.tenhang && formik.errors.tenhang ? (
                                            <div className={style["validate"]}>{formik.errors.tenhang}</div>
                                        ) : null}
                                </div>
                            </div>
                            <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={handleEdit}>Lưu</button>
                                    {/* <button type="submit" className="btn btn-primary">Lưu</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                    // </form>
            )}
        </>
    )
}

export default ModalBrand