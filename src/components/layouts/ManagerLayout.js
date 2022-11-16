import styled from "styled-components";
import { zManagerRoute } from "../../routes/route";
import SideBar from "../../common/manager/SideBar";
import ManagerWrappers from "../elements/ManagerWrappers";
import ManagerContentWrappers from "../elements/ManagerContentWrappers";
import Breadcrumb from "../../common/manager/Breadcrumb";
import { BrowserRouter as Router, Route, Redirect, Routes, useParams, useLocation } from "react-router-dom";
const ManagerLayout = () => {
    const params = useParams();
    const location = useLocation();
    const nonLayoutList = ['/manager', '/manager/login'];
    return (
        <>
            {nonLayoutList.includes(location.pathname) || !location.pathname.includes('/manager/') ?
                <>
                    <Routes>
                        {zManagerRoute.map((route, idx) => (
                            <>
                                <Route exact key={idx} path={route.link} element={route.element} />
                            </>
                        ))}
                    </Routes>
                </>
                :
                <>
                    <ManagerWrappers>
                        <SideBar />
                        <ManagerContentWrappers>
                            <Breadcrumb title={`메인 배너 ${params.pk == 0 ? '추가' : '수정'}`} nickname={``} />
                            <Routes>
                                {zManagerRoute.map((route, idx) => (
                                    <>
                                        <Route exact key={idx} path={route.link} element={route.element} />
                                    </>
                                ))}
                            </Routes>
                        </ManagerContentWrappers>
                    </ManagerWrappers>
                </>
            }

        </>
    )
}
export default ManagerLayout;