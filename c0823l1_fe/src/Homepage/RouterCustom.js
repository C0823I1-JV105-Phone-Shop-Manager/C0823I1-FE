import {ROUTERS} from "./utils/router.js";
import HomePage from "./pages/user/homePage/homePage";
import {Route, Routes} from "react-router-dom";
import MasterLayout from "./pages/user/theme/masterLayout/index";
const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage/>,  // <HomePage/> is a component
        }
    ]
    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, index) =>
                    (
                        <Route key={index} path={item.path} element={item.component}/>
                    ))}
            </Routes>
        </MasterLayout>
    )
}

const RouterCustom = () => {
    return renderUserRouter();

}
export default RouterCustom;