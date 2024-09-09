import {ROUTERS} from "./utils/router.js";
import HomePage from "./pages/user/homePage/homePage";
import {Route} from "react-router-dom";
import MasterLayout from "./pages/user/theme/masterLayout/index";
import React from "react";
const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage/>,  // <HomePage/> is a component
        }
    ]
    return (
            <MasterLayout>
                {userRouters.map((item, index) => (
                    <Route key={index} path={item.path} element={item.component} />
                ))}
            </MasterLayout>
    )
}

const RouterCustom = () => {
    return renderUserRouter();

}
export default RouterCustom;