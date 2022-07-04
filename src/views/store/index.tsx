import React from "react";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {getOrders} from "../../redux/actions/store";

import { Table } from "reactstrap";
import { Container, Content } from "../seasons/styles";
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
// import { CreateBtn } from "../players/style";
import { H2 } from "../institutions/styles";

const Store = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate()

    const items = useSelector((state: any) => state.store)
    const loading = useSelector((state: any) => state.store.loading)
    const mainDataResult = items && items ? items.orders: [];

    React.useEffect(() => {
        dispatch(getOrders())
      }, [dispatch])

      const viewOrder = (id: any) => {
        navigate(`/order/edit/${id}`)
      }

    return(
        <Container>
        <ContentHeader title="Order(s)">
             {/* <CreateBtn>CREATE VOLUNTEER</CreateBtn> */}
         </ContentHeader>
         <Content>
         {loading ? <Loader/>:
            mainDataResult.length === 0 ? <H2>NO ORDER FOUND</H2> :
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fisrt Name</th>
                        <th>Last Name</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Order Ref</th>
                    </tr>
                </thead>
                <tbody>
                { mainDataResult && mainDataResult?.data?.map((item: any, index: any) => (
                    <tr key={index} onClick={() => viewOrder(item._id)}>
                        <th scope="row">{index + 1}</th>
                        <td>{item?.User?.Firstname}</td>
                        <td>{item?.User?.Lastname}</td>
                        <td>{item?.Total?.$numberDecimal}</td>
                        <td>{item?.OrderStatus}</td>
                        <td>{item?.OrderRef}</td>
                    </tr>
              )) }
                </tbody>
            </Table>
            }
        </Content>
        </Container>
    )
}

export default Store;