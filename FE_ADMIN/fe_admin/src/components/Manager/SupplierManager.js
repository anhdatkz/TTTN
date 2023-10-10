import style from "./Manager.module.css"

export default function SupplierManager(params) {
    return (
        <>
            <div className={style["manager"]}>
                <div className="employee">
                    <div className="employee-header d-flex justify-content-between">
                        <h2 className="title">Nhân viên</h2>
                        <button className="btn btn-primary">Thêm</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Mã ĐĐH</th>
                                <th>Ngày lập</th>
                                <th>Nhà cung cấp</th>
                                <th>Trạng thái</th>
                                <th>Người lập</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
};
