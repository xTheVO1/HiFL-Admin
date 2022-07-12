import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';

import { RootState } from '../../redux/reducers';
import { Container } from './styles';
import ContentHeader from '../../components/ContentHeader';
import { Content, H2 } from '../institutions/styles';
import Loader from "../../components/Loader";
import {getUser, updateUser, getUsers} from "../../redux/actions/user";
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

function ViewUser() {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const items = useSelector((state: RootState) => state.auth.singleUser);
    const loading = useSelector((state: any) => state.auth.loading)
    const updateLoading = useSelector((state: any) => state.auth.updateLoading)
    const updatedUser = useSelector((state: any) => state.auth.updatedUser)
    const mainDataResult = items && items ? items.user : {};
    const [inputObject, setInputObject] = useState({
        Email:"",
        Firstname: "",
        Lastname: "",
        Username: "",
        _id: "",
        Address: "",
       Country:"",
        State:"",
        Phonenumber:"",
       Supportinginstitution:" ",
        Role: "",
        Birthday: "",
        Gender: "",
        Instagram: "",
    })
    

    useEffect(() => {
        dispatch(getUser(id))
      }, [dispatch])

    useEffect(() => {
       
        setInputObject({
            Email: mainDataResult?.Email,
            Firstname: mainDataResult?.Firstname,
            Lastname: mainDataResult?.Lastname,
            Username: mainDataResult?.Username,
            Address: mainDataResult?.props?.Address,
            Country: mainDataResult?.props?.Country,
            State: mainDataResult?.props?.State,
            Phonenumber: mainDataResult?.Phonenumber,
            Supportinginstitution: mainDataResult?.props?.Supportinginstitution,
            Role: mainDataResult?.Role,
            _id: mainDataResult?._id,
            Birthday: mainDataResult?.props?.Birthday,
            Gender: mainDataResult?.props?.Gender,
            Instagram: mainDataResult?.props?.Instagram
        })
      }, [mainDataResult])

    const back = ( ) => {
        navigate("/users")
    }

    const editUser = (id: any) => {
       const props = {};
        const details = {
            _id: inputObject._id,
            params:{
                Email: inputObject?.Email,
            Firstname: inputObject?.Firstname,
            Lastname: inputObject?.Lastname,
            Role: inputObject?.Role,
            _id: inputObject?._id,
            props: {
                ...props,
                Address: inputObject?.Address,
                Country:inputObject?.Country,
                State: inputObject?.State,
                Phonenumber: inputObject?.Phonenumber,
                Supportinginstitution: inputObject.Supportinginstitution,
                Birthday: inputObject?.Birthday,
                Gender: inputObject?.Gender,
                Instagram: inputObject?.Instagram
            },
            }
        }
        dispatch(updateUser(details))
        dispatch(getUsers())
        navigate("/users")
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        setInputObject({
          ...inputObject,
          [e.target.name]: e.target.value,
        });
    }

    const role = [
        { type: "ADMIN", value:"Admin"},
        { type: "SUPERADMIN", value: "SuperAdmin" },
        { type: "USER", value: "User" },
        { type: "ACCREDITOR", value: "Accreditor" },
        { type: "TEAMMANEGER", value: "TeamManager" },
      ]
return (
    <Container >
        <ContentHeader title="User">
        {/* <CreateBtn onClick={addLeague}>CREATE LEAGUE</CreateBtn> */}
        <CreateBtn onClick={back}>Go Back</CreateBtn>
        </ContentHeader>
            <Content>
                {loading ? <Loader/> :
                mainDataResult === {} ? <H2>NO USER FOUND</H2> :
                <Form onSubmit={(e) => editUser(e)}>
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
                            name="Lastname"
                            onChange={(e) => handleChange(e)}
                            value={inputObject.Lastname}disabled
                          />
                 </FormHolder>
                 <FormHolder>
                          <Label>USERNAME</Label>
                          <Input
                            name="Username"
                            onChange={(e) => handleChange(e)}
                            value={inputObject.Username} disabled
                          />
                 </FormHolder>
                 <FormHolder>
                          <Label>PHONE NUMBER</Label>
                          <Input
                          type="text"
                            name="PhoneNumber"
                            onChange={(e) => handleChange(e)}
                            value={inputObject.Phonenumber} disabled
                          />
                 </FormHolder>
                 <FormHolder>
                          <Label>EMAIL</Label>
                          <Input
                          type="email"
                            name="Email"
                            onChange={(e) => handleChange(e)}
                            value={inputObject.Email} disabled
                          />
                 </FormHolder>
                 <FormHolder>
                          <Label>GENDER</Label>
                          <Input
                          type="text"
                            name="Gender"
                            onChange={(e) => handleChange(e)}
                            value={inputObject.Gender} disabled
                          />
                 </FormHolder>
                 <FormHolder>
                          <Label>DATE OF BIRTH</Label>
                          <Input
                          type="text"
                            name="Birthday"
                            onChange={(e) => handleChange(e)}
                            value={inputObject.Birthday} disabled
                          />
                 </FormHolder>
                 <FormHolder>
                          <Label>INSTAGRAM HNADLE</Label>
                          <Input
                          type="text"
                            name="Instagram"
                            onChange={(e) => handleChange(e)}
                            value={inputObject.Instagram} 
                          />
                 </FormHolder>
                 <Section>
                  <Label>ROLE</Label>
                  <Select
                    name="Role"
                    onChange={(e: any) => handleChange(e)}
                    value={inputObject.Role}
                  >
                    <option>Select Status</option>
                    {role.map(item => (
                            <option key={item.value} value={item.value}>{item.type}</option>
                          ))}
                    </Select>
                  </Section> 
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
                      <Label>COUNTRY</Label>
                      <Input
                        type="text"
                        name="Country"
                        required
                        onChange={(e) => handleChange(e)}
                        value={inputObject.Country}
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
                      <Label>SUPPORTING INSTITUTION</Label>
                      <Input
                        type="text"
                        name="Supportinginstitution"
                        required
                        onChange={(e) => handleChange(e)}
                        value={inputObject.Supportinginstitution}
                      />
                    </FormHolder>
                  </Section>
                
                  <BtnDiv>
                    <CreateBtn type="submit">{updateLoading ? <Spinner/> : "UPDATE"}</CreateBtn>
                  </BtnDiv>
                </Form>
                }
            </Content>
    </Container>
);
}

export default ViewUser;