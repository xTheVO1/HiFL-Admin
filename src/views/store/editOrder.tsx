import React, { useState } from "react";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import {getOrder, updateOrder} from "../../redux/actions/store";
import { Table } from "reactstrap";
import { Container, Content } from "../seasons/styles";
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
import { H2 } from "../institutions/styles";
import {
    Label,
    Form,
    CreateBtn,
    Section,
    Input,
    FormHolder,
    TextArea,
    BtnDiv,
    Select
  } from "../players/style";
import { Spinner } from "reactstrap";
import moment from "moment";


const EditOrder = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputObject, setInputObject] = useState({
        Email:"",
        Firstname: "",
        Lastname: "",
        _id: "",
        Address: "",
        Lga:"",
        State:"",
        PhoneNumber:"",
        NearestBusStop:"",
        OrderItems: [],
        OrderRef:"",
        OrderDate: "",
        OrderStatus:"",
        ShippingOption: "",
        Total: "",

    })

    const items = useSelector((state: any) => state.store)
    const loading = useSelector((state: any) => state.store.loading)
    const updateLoading = useSelector((state: any) => state.store.updateLoading)
    const mainDataResult = items && items ? items?.order?.data : {};

   
    React.useEffect(() => {
        dispatch(getOrder(id))
      }, [dispatch])

      React.useEffect(() => {
       
        setInputObject({
            Email: mainDataResult?.User?.Email,
            Firstname: mainDataResult?.User?.Firstname,
            Lastname: mainDataResult?.User?.Lastname,
            Address: mainDataResult?.DeliveryAddress?.Address,
            Lga: mainDataResult?.DeliveryAddress?.Lga,
            State: mainDataResult?.DeliveryAddress?.State,
            PhoneNumber: mainDataResult?.DeliveryAddress?.PhoneNumber,
            NearestBusStop: mainDataResult?.DeliveryAddress?.NearestBusStop,
            OrderItems: mainDataResult?.OrderItems,
            OrderRef: mainDataResult?.OrderRef,
            OrderStatus:mainDataResult?.OrderStatus,
            OrderDate: mainDataResult?.OrderDate,
            ShippingOption: mainDataResult?.ShippingOption?.ShippingFee?.$numberDecimal,
            Total: mainDataResult?.Total?.$numberDecimal,
            _id: mainDataResult?._id
        })
      }, [mainDataResult])

      const handleChange = (e: any) => {
       
        e.preventDefault();
        setInputObject({
          ...inputObject,
          [e.target.name]: e.target.value,
        });
      }

      const editVolunteer = (e: any) => {
        e.preventDefault();
        const address = {}
        const details ={
            _id: inputObject._id,
            params:{
              DeliveryAddress: {...address,
                Address: inputObject?.Address, 
                Lga: inputObject?.Lga,
                State: inputObject?.State,
                NearestBusStop: inputObject?.NearestBusStop,
                PhoneNumber: inputObject?.PhoneNumber},
              OrderItems: inputObject?.OrderItems,
              OrderRef: inputObject?.OrderRef,
              OrderStatus: inputObject?.OrderStatus,
              OrderDate: inputObject?.OrderDate,
              ShippingOption: inputObject?.ShippingOption,
              Total: inputObject?.Total
            }
        }
        dispatch(updateOrder(details))
        navigate("/store")
      }

      const goBack = () => {
        navigate("/store")
      }

      const orderStatus = [
        { type: "PENDING", value:"PENDING"},
        { type: "PROCESSING", value: "PROCESSING" },
        { type: "READYFORPICKUP", value: "READYFORPICKUP" },
        { type: "SHIPPED", value: "SHIPPED" },
        { type: "DELIVERED", value: "DELIVERED" },
        { type: "FULFILLED", value: "FULFILLED" },
        { type: "CANCELED", value: "CANCELED" }
      ]
    return(
        <Container>
        <ContentHeader title="Update Order">
        <CreateBtn onClick={goBack}>BACK</CreateBtn>
         </ContentHeader>
         <Content>
         {loading ? <Loader/>:
            mainDataResult === {} ? <H2>NO VOLUNTEER FOUND</H2> :
           <>
           <Form onSubmit={(e) => editVolunteer(e)}>
            <Section>
            <FormHolder>
                  <Label>FIRST NAME</Label>
                  <Input
                    name="Firstname"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Firstname} disabled
                    />
                    </FormHolder>
                  <FormHolder>
                      <Label>LASTNAME</Label>
                      <Input
                        name="lastname"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.Lastname}disabled
                      />
             </FormHolder>
             <FormHolder>
                      <Label>PHONE NUMBER</Label>
                      <Input
                        name="PhoneNumber"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.PhoneNumber} disabled
                      />
             </FormHolder>
             <FormHolder>
                      <Label>DATE ORDERED</Label>
                      <Input
                        name="OrderDate"
                        onChange={(e) => handleChange(e)}
                        value={moment(inputObject.OrderDate).format("LL")} disabled
                      />
             </FormHolder>
              <FormHolder>
                  <Label>ORDER REF</Label>
                  <Input
                    name="OrderRef"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.OrderRef} disabled
                  />
              </FormHolder>
              <FormHolder>
                  <Label>ORDER STATUS</Label>
                  <Select
                    name="OrderStatus"
                    onChange={(e: any) => handleChange(e)}
                    value={inputObject.OrderStatus}
                  >
                    <option>Select Status</option>
                    {orderStatus.map(item => (
                            <option value={item.value}>{item.type}</option>
                          ))}
                    </Select>
                  </FormHolder>   
                <FormHolder>
                  <Label>SHIPPING FEE</Label>
                  <Input
                    name="ShippingFee"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.ShippingOption}
                  />
                  </FormHolder>
                  <FormHolder>
                  <Label>TOTAL</Label>
                  <Input
                    name="Total"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Total}
                  />
                  </FormHolder>
                </Section>
                  <Section>
                  <h4>DELIVERY ADDRESS</h4>
                </Section>
                <Section>
                <FormHolder>
                  <Label>STREET ADDRESS</Label>
                  <Input
                    type="text"
                    name="Address"
                    required
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Address}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>LOCAL GOVERNMENT</Label>
                  <Input
                    type="text"
                    name="Lga"
                    required
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Lga}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>STATE</Label>
                  <Input
                    type="text"
                    name="State"
                    required
                    onChange={(e) => handleChange(e)}
                    value={inputObject.State}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>NEAREST BUSSTOP</Label>
                  <Input
                    type="text"
                    name="NearestBusStop"
                    required
                    onChange={(e) => handleChange(e)}
                    value={inputObject.NearestBusStop}
                  />
                </FormHolder>
              </Section>
            
              <BtnDiv>
                <CreateBtn type="submit">{updateLoading ? <Spinner/> : "UPDATE"}</CreateBtn>
              </BtnDiv>
            </Form>
             <Table hover>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Size</th>
                      <th>Product Code</th>
                      <th>Quantity</th>

                  </tr>
              </thead>
              <tbody>
              {inputObject.OrderItems && inputObject.OrderItems?.map((item: any, index: any) => (
                  <tr key={index}>
                      <th >{index + 1}</th>
                      <td>{item.Title}</td>
                      <td>{item.Price}</td>
                      <td>{item.Size}</td>
                      <td>{item.ProductCode}</td>
                      <td>{item.Quantity}</td>
                  </tr>
                  )) }
              </tbody>
            </Table>
            </> 
            }
        </Content>
        </Container>
    )
}

export default EditOrder;