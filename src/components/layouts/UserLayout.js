import { zUserRoute } from "../../routes/route";
import { BrowserRouter as Router, Route, Redirect, Routes, useParams, useLocation } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import MetaTag from "../MetaTag";
import Headers from "../../common/Headers";
import ScrollToTopButton from "../ScrollToTopButton";
import BottomMenu from "../../common/BottomMenu";
import Footer from "../../common/Footer";

const UserLayout = () => {
    return (
        <>
            <Headers />
            <ScrollToTop />
            <MetaTag />
            <>
                <Routes>
                    {zUserRoute.map((route, idx) => (
                        <>
                            <Route exact key={idx} path={route.link} element={route.element} />
                        </>
                    ))}

                </Routes>
            </>
            <ScrollToTopButton />
            {/* <BottomMenu /> */}
            <Footer />
        </>
    )
}
export default UserLayout;