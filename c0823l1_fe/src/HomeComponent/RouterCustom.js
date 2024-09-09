import {ROUTERS} from "./utils/router";
import HomePage from "./pages/user/homePage/homePage";
import {Route} from "react-router-dom";
import MasterLayout from "./pages/user/theme/masterLayout";

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage/>,
        }
    ]
    return (
        <MasterLayout>
                {userRouters.map((item, index) =>
                    (
                        <Route key={index} path={item.path} element={item.component}/>
                    ))}
        </MasterLayout>
    )
}

const RouterCustom = () => {
    return renderUserRouter();

}
export default RouterCustom;