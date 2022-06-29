import React, { useState } from "react";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import {getVolunteer, updateVolunteer} from "../../redux/actions/volunteer";

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
    BtnDiv
  } from "../players/style";
import { Spinner } from "reactstrap";


const EditVolunteer = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputObject, setInputObject] = useState({
        Email:"",
        Firstname: "",
        Lastname: "",
        Level: "",
        Department: "",
        Program: "",
        MatricNo: "",
        WhyJoinVolunteer: "",
        NextOfKinName:"",
        NextOfKinPhone:"",
        _id: ""
    })

    const items = useSelector((state: any) => state.volunteers)
    const loading = useSelector((state: any) => state.volunteers.loading)
    const updateLoading = useSelector((state: any) => state.volunteers.updateLoading)
    const mainDataResult = items && items ? items.volunteer: {};

   
    React.useEffect(() => {
        dispatch(getVolunteer(id))
      }, [dispatch])

      React.useEffect(() => {
       
        const {User} = mainDataResult;
        setInputObject({
            Email: User?.Email,
            Firstname: User?.Firstname,
            Lastname: User?.Lastname,
            Level: mainDataResult?.Level,
            Department: mainDataResult?.Department,
            Program: mainDataResult?.Program,
            MatricNo: mainDataResult?.MatricNo,
            WhyJoinVolunteer: mainDataResult?.WhyJoinVolunteer,
            NextOfKinName: mainDataResult?.NextOfKinName,
            NextOfKinPhone:mainDataResult?.NextOfKinPhone,
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
        const details ={
            _id: inputObject._id,
            params:{
                Level: inputObject.Level,
                Department: inputObject.Department,
                Program: inputObject.Program,
                MatricNo: inputObject.MatricNo,
                WhyJoinVolunteer: inputObject.WhyJoinVolunteer,
                NextOfKinName: inputObject.NextOfKinName,
                NextOfKinPhone: inputObject.NextOfKinPhone,
            }
        }
        dispatch(updateVolunteer(details))
        navigate("/volunteer")
      }
    return(
        <Container>
        <ContentHeader title="Update Volunteer">
         </ContentHeader>
         <Content>
         {loading ? <Loader/>:
            mainDataResult === {} ? <H2>NO VOLUNTEER FOUND</H2> :
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
                  <Label>EMAIL</Label>
                  <Input
                    name="Email"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Email} disabled
                  />
              </FormHolder>
              <FormHolder>
                  <Label>MATRIC NO.</Label>
                  <Input
                    name="MatricNo"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.MatricNo}
                  />
                  </FormHolder>
                <FormHolder>
                  <Label>DEPARTMENT</Label>
                  <Input
                    name="Department"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Department}
                  />
                  </FormHolder>
                  <FormHolder>
                  <Label>PROGRAM</Label>
                  <Input
                    name="Program"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Program}
                  />
                  </FormHolder>
                  <FormHolder>
                  <Label>LEVEL</Label>
                  <Input
                    name="Level"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Level}
                  />
               </FormHolder>
               <FormHolder>
                  <Label>PROGRAM</Label>
                  <Input
                    name="Program"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Program}
                  />
               </FormHolder>
               <FormHolder>
                  <Label>NEXT OF KIN NAME</Label>
                  <Input
                    name="NextOfKinName"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.NextOfKinName}
                  />
               </FormHolder>
               <FormHolder>
                  <Label>NEXT OF KIN PhONE</Label>
                  <Input
                    name="NextOfKinPhone"
                    onChange={(e) => handleChange(e)}
                    value={inputObject.NextOfKinPhone}

                  />
               </FormHolder>
              </Section>
              <Section>
              <Label>WHY JOIN VOLUNTEER?</Label>
                <TextArea 
                name="WhyJoinVolunteer" 
                value={inputObject.WhyJoinVolunteer}
                onChange={(e) => handleChange(e)}
                />
              </Section>
              <BtnDiv>
                <CreateBtn type="submit">{updateLoading ? <Spinner/> : "UPDATE"}</CreateBtn>
              </BtnDiv>
            </Form>
            }
        </Content>
        </Container>
    )
}

export default EditVolunteer;