import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiConfig from '../../api/apiConfigs';
import style from './Register.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getDate } from '../../ultils/Format';
import { registerValidations } from '../../ultils/ValidationMessages';

function Register() {
    const [accountData, setAccountData] = useState({})
    let navigate = useNavigate()
    const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    const usernameRegex = /^[a-zA-Z0-9]+$/
    const numberRegex = /^\d+$/
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            matk: "",
            password: "",
            cmnd: "",
            tenkh: "",
            diachi: "",
            sdt: "",
            email: "",
            ngaysinh: ""
        },
        validationSchema: Yup.object({
            matk: Yup.string()
                .max(20, registerValidations.VALIDATION_USERNAME_E003)
                .required(registerValidations.VALIDATION_USERNAME_E001).matches(usernameRegex, registerValidations.VALIDATION_USERNAME_E002),
            password: Yup.string()
                .max(20, registerValidations.VALIDATION_PASS_E002)
                .required(registerValidations.VALIDATION_PASS_E001).matches(usernameRegex, registerValidations.VALIDATION_PASS_E003),
            cmnd: Yup.string()
                // .max(10, "CMND phải có ít hơn 10 ký tự")
                .required(registerValidations.VALIDATION_CMND_01).matches(numberRegex, registerValidations.VALIDATION_CMND_02),
            tenkh: Yup.string()
                .required(registerValidations.VALIDATION_NAME),
            diachi: Yup.string()
                .required(registerValidations.VALIDATION_ADDRESS),
            sdt: Yup.string()
                .min(10, registerValidations.VALIDATION_PHONENUMBER_02)
                .max(10, registerValidations.VALIDATION_PHONENUMBER_02)
                .required(registerValidations.VALIDATION_PHONENUMBER_01).matches(phoneRegExp, registerValidations.VALIDATION_PHONENUMBER_03),
            email: Yup.string().email(registerValidations.VALIDATION_EMAIL_01)
                .required(registerValidations.VALIDATION_EMAIL_02),
        }),
        onSubmit: (values) => {
            const registerData = {
                cmnd: values.cmnd.trim(),
                tenkh: values.tenkh.trim(),
                diachi: values.diachi.trim(),
                ngaysinh: values.ngaysinh,
                sdt: values.sdt.trim(),
                email: values.email.trim(),
                taiKhoanKH: {
                    matk: values.matk.trim(),
                    password: values.password.trim(),
                    // quyen: {
                    //     maquyen: "KH",
                    //     tenquyen: "ROLE_USER"
                    // }
                }
            }

            fetch(`${apiConfig.baseUrl}/khachhang`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.success === true) {
                        // const cartData = {
                        //     khachHangGH: {
                        //         cmnd: values.cmnd.trim()
                        //     }
                        // }
                        // fetch(`${apiConfig.baseUrl}/giohang`, {
                        //     method: 'POST',
                        //     headers: {
                        //         'Content-Type': 'application/json',
                        //     },
                        //     body: JSON.stringify(cartData),
                        // })

                        toast.success("Tạo tài khoản thành công!", {
                            position: "top-center"
                        })
                        navigate("/login")
                    }
                    else {
                        toast.warn(data.message, {
                            position: "top-center"
                        })
                    }
                })
                .catch((error) => {
                    toast.error("Đăng ký thất bại!", {
                        position: "top-center"
                    })
                    console.error('Error:', error);
                });
        }
    })

    return (
        <>
            <form className={`${style["container"]} p-3`} onSubmit={formik.handleSubmit} autoComplete="off">
                <h3>Đăng ký</h3>

                <div className={style["register-info"]}>
                    <div className={style["register-info-item"]}>
                        <div className={style["info-item"]}>
                            <label>Tên đăng nhập</label>
                            <input type="text" className="form-control" name='matk'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Tên đăng nhập" />
                            {formik.touched.matk && formik.errors.matk ? (
                                <div className={style["validate"]}>{formik.errors.matk}</div>
                            ) : null}
                        </div>
                        <div className={style["info-item"]}>
                            <label>CMND</label>
                            <input
                                type="text" className="form-control" name='cmnd' onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="ID"
                            />
                            {formik.touched.cmnd && formik.errors.cmnd ? (
                                <div className={style["validate"]}>{formik.errors.cmnd}</div>
                            ) : null}
                        </div>
                        <div className={style["info-item"]}>
                            <label>Địa chỉ</label>
                            <input type="text" className="form-control" placeholder="Địa chỉ" name='diachi' onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.diachi && formik.errors.diachi ? (
                                <div className={style["validate"]}>{formik.errors.diachi}</div>
                            ) : null}
                        </div>

                        <div className={style["info-item"]}>
                            <label>Email</label>
                            <input
                                type="email" className="form-control" name='email' onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Email"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className={style["validate"]}>{formik.errors.email}</div>
                            ) : null}
                        </div>

                    </div>

                    <div className={style["register-info-item"]}>
                        <div className={style["info-item"]}>
                            <label>Mật khẩu</label>
                            <div className={style["input-password"]}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Mật khẩu"
                                />
                                {showPassword ? (<FaEyeSlash onClick={toggleShowPassword}></FaEyeSlash>) : (<FaEye onClick={toggleShowPassword}></FaEye>)}
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className={style["validate"]}>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className={style["info-item"]}>
                            <label>Họ tên</label>
                            <input type="text" className="form-control" placeholder="Họ tên" name='tenkh' onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.tenkh && formik.errors.tenkh ? (
                                <div className={style["validate"]}>{formik.errors.tenkh}</div>
                            ) : null}
                        </div>
                        <div className={style["info-item"]}>
                            <label>SĐT</label>
                            <input
                                type="text" className="form-control" name='sdt' onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Số điện thoại"
                            />
                            {formik.touched.sdt && formik.errors.sdt ? (
                                <div className={style["validate"]}>{formik.errors.sdt}</div>
                            ) : null}
                        </div>

                        <div className={style["info-item"]}>
                            <label>Ngày sinh</label>
                            <input
                                type="date" className="form-control" name='ngaysinh' onChange={formik.handleChange}
                                onBlur={formik.handleBlur} max={getDate()}
                                placeholder="Ngày sinh"
                            />
                        </div>
                    </div>
                </div>

                <div className={style["register-action"]}>
                    <button type='submit' className="btn btn-primary">
                        Đăng ký
                    </button>
                    <p className={`${style["forgot-password"]} ${style["text-right"]} `}>
                        Đã có tài khoản <Link to="/login">Đăng nhập?</Link>
                    </p>
                </div>
            </form>
        </>
    )
}

export default Register;