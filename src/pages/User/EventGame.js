import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { OneCard, Row, Title, Wrappers } from "../../components/elements/UserContentTemplete";
import { untilReady } from "../../functions/utils";

const EventGame = () => {
    const params = useParams();
    const { pathname } = useLocation();
    const [post, setPost] = useState({})
    useEffect(() => {
        untilReady();
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/item?table=coupon&pk=${params?.pk}`);
            setPost(response?.data);
        }
        fetchPost();
    }, [pathname])
    return (
        <>
            <Wrappers>
                <Title>이벤트게임</Title>
                <Row style={{ margin: '0 0 64px 0' }}>

                    <OneCard width={96} style={{ height: '150px', cursor: 'default' }}>

                    </OneCard>
                </Row>
            </Wrappers>
        </>
    )
}
export default EventGame;