import { useEffect, useState } from "react"
import style from "./Manager.module.css"
import apiConfig from "../../api/apiConfigs"
import { formatDate } from "../../ultils/Format"
import { FaPlusCircle } from "react-icons/fa"

export default function SupplierManager(params) {
    const [datHangs, setDatHangs] = useState([])

    useEffect(() => {
        fetch(`${apiConfig.baseUrl}/dathang`)
            .then((res) => res.json())
            .then((data) => {
                setDatHangs(data)
                console.log(data)
            })
    }, [])

    return (
        <>
            <div className={style["manager"]}>
                <div className="employee">
                    <div className="employee-header d-flex justify-content-between">
                        <h2 className="title">Đơn đặt hàng nhà cung cấp</h2>
                        <button className="btn btn-primary">Thêm</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Mã ĐĐH</th>
                                <th>Ngày lập</th>
                                <th>Nhà cung cấp</th>
                                <th>Người lập</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {datHangs.map((dathang) => (
                                <tr key={dathang.maddh}>
                                    <td>{dathang.maddh}</td>
                                    <td>{formatDate(dathang.ngaylap)}</td>
                                    <td>{dathang.nhaCCDH.tenncc}</td>
                                    <td>{dathang.nhanVienDH.hoten}</td>
                                    <td className={style["order-action"]}>
                                        <button className="btn btn-primary">Chi tiết</button>
                                    </td>
                                    <td>
                                        <div className={style["order-add"]}><FaPlusCircle></FaPlusCircle></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
};
