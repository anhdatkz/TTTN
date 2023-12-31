import Login from "./components/Login/Login"
import Admin from "./pages/Admin/Admin"
import AdminEmployee from "./pages/Admin/AdminEmployee"
import AdminOrder from "./pages/Admin/AdminOrder"
import AdminProduct from "./pages/Admin/AdminProduct"
import AdminReceivedNote from "./pages/Admin/AdminReceivedNote"
import AdminReport from "./pages/Admin/AdminReport"
import AdminSupplier from "./pages/Admin/AdminSupplier"

const publicRouteLogin = { path: "/", component: Login }

const privateRoutesAdmin = [
    { path: "/manager", component: Admin },
    { path: "/manager/brand", component: Admin },
    { path: "/manager/product", component: AdminProduct },
    { path: "/manager/employee", component: AdminEmployee },
    { path: "/manager/order", component: AdminOrder },
    { path: "/manager/supplier", component: AdminSupplier },
    { path: "/manager/received-note", component: AdminReceivedNote },
    { path: "/manager/report", component: AdminReport },
    { path: "/manager/account", component: AdminReport },
    // { path: "/", component: Login },
    // { path: "/login", component: Login },
]

export { privateRoutesAdmin, publicRouteLogin }