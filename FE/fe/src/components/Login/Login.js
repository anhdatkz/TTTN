import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { scrollTop } from '../../App'
import { toast } from "react-toastify"
import apiConfigs from '../../api/apiConfigs'
import { useFormik } from 'formik';
import * as Yup from "yup"
import apiConfig from '../../api/apiConfigs';
import { loginData } from '../../ultils/LoginData';
import { useDispatch } from 'react-redux';
import { getCartItem } from '../../features/cartSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Login() {
    const [username, setUserName] = useState("")
    const [password, setPassWord] = useState("")
    const [accounts, setAccounts] = useState([])
    const [showPassword, setShowPassword] = useState(false);

    const usernameRegex = /^[a-zA-Z0-9]+$/

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    let navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(20, "Tên đăng nhập phải có ít hơn 20 ký tự")
                .required("Tên đăng nhập không được rỗng!").matches(usernameRegex, "Username viết liền không dấu"),
            password: Yup.string()
                .max(20, "Mật khẩu phải có ít hơn 20 ký tự")
                .required("Mật khẩu không được rỗng!").matches(usernameRegex, "Mật khẩu viết liền không dấu"),
        }),
        onSubmit: (values) => {
            localStorage.setItem('isLogin', false)
            const formData = {
                matk: values.username.trim(),
                password: values.password.trim()
            }

            fetch(`${apiConfigs.baseUrl}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw Error(response.status)
                })
                .then((data) => {

                    localStorage.setItem('isLogin', true)
                    // localStorage.setItem('username', data.name)
                    // localStorage.setItem('role', data.authorities[0])
                    localStorage.setItem('token', data.token)
                    setAccounts(data)

                    fetch(`${apiConfig.baseUrl}/giohang/kh`, {
                        headers: {
                            'Authorization': data.token
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            localStorage.setItem('cartId', data.idgiohang)
                        })

                    fetch(`${apiConfig.baseUrl}/ctgh/kh`)
                        .then((res) => res.json())
                        .then((data) => {
                            localStorage.setItem('cartItems', data)
                        })

                    if (data.authorities[0] === "ROLE_USER") {
                        toast.success("Đăng nhập thành công", {
                            position: "top-center"
                        })
                        navigate("/user/profile")
                    } else {
                        localStorage.setItem('isLogin', false)
                        localStorage.setItem('username', "")
                        localStorage.setItem('role', "")
                        localStorage.setItem('token', "")
                        toast.error("Tên đăng nhập hoặc mật khẩu không đúng", {
                            position: "top-center"
                        })
                    }

                    console.log('Success:', data);
                })
                .catch((error) => {
                    toast.error("Tên đăng nhập hoặc mật khẩu không đúng", {
                        position: "top-center"
                    })
                    // loadData()
                    console.error('Error:', error);
                });

            scrollTop()
        }
    })

    console.log(formik)

    return (
        <>
            <div className={style["container"]}>
                <form className={`${style["login-form"]} p-3`} onSubmit={formik.handleSubmit} autoComplete="off">
                    <h3>Đăng nhập</h3>
                    <div className="mb-3">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            id='username'
                            name='username'
                            className="form-control"
                            placeholder="Tên đăng nhập"
                            value={formik.values.username}
                            // onChange={e => setUserName(e.target.value.trim())}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className={style["validate"]}>{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <label>Mật khẩu</label>
                        <div className={style["input-password"]}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                className="form-control"
                                placeholder="Mật khẩu"
                                value={formik.values.password}
                                // onChange={e => setPassWord(e.target.value.trim())}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {showPassword ? (<FaEyeSlash onClick={toggleShowPassword}></FaEyeSlash>) : (<FaEye onClick={toggleShowPassword}></FaEye>)}
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className={style["validate"]}>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                            Đăng nhập
                        </button>
                        <div className="btn btn-primary">
                            <Link to="/register" className='text-white'>Đăng ký</Link>
                        </div>
                    </div>
                    <p className="forgot-password text-right">
                        Quên <a href="#">mật khẩu?</a>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login;