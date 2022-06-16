import React,{useState, useEffect} from "react";
import {
    MdCreate,MdRestoreFromTrash
  } from "react-icons/md";
import { Container, Content, Loader } from "../teams/styles";
import ContentHeader from "../../components/ContentHeader";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import {
    Modal,
    ModalHeader, ModalBody
  } from "reactstrap";
  import {
    Label,
    Form,
    CreateBtn,
    Section,
    Select,
    FormHolder,
    BtnDiv,
    Input
  } from "../players/style";
import { getSettings, selectedItem } from "../../redux/actions/settings";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";

function ViewSetting() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const dispatch: Dispatch<any> = useDispatch();
    const items = useSelector((state: any) => state.settings)
    const {settings, loading} = items;
    const mainDataResult = settings && settings ? settings : [];
   
    useEffect(() => {
        dispatch(getSettings())
    },[])

    const createSetting = (item: any) => {
        navigate("/create-setting")
    }

    const viewSetting = (id: any) => {

    }
    const toggle = (item: any) => {
        setModal(!modal)
        dispatch(selectedItem({data: item, isEdit: true}))
        navigate("/edit-setting")
      }

    const update = (e: any) => {
    e.preventDefault();
    // const details = {
    //     CurrentSeason: activeSeason,
    //     CurrentLeague: activeLeague,
    //     CurrentStage: inputObject.CurrentStage,
    //     LeagueName: inputObject.LeagueName,
    //     Sport: inputObject.Sport
    // }
    // dispatch(postSettings(details))
    }
    
    // const mainDataResult = [
    //     {SeasonName: "Ami",SeasonYear: "2022", InstitutionType: "University" , _id: 1 },
    //     {SeasonName: "Ami",SeasonYear: "2022", InstitutionType: "University", _id: 3  },
    //     {SeasonName: "Ami",SeasonYear: "2022", InstitutionType: "University", _id: 2  },
    //     {SeasonName: "Ami",SeasonYear: "2022", InstitutionType: "University", _id: 4  },
    // ]

    // const handleChange = (e: any) => {
    //     e.preventDefault();
    //     setObject({
    //       ...inputObject,
    //       [e.target.name]: e.target.value,
    //     });
    //   };

    return(
        <Container>
        <ContentHeader title="Settings" >
        <CreateBtn onClick={createSetting}>CREATE SETTING</CreateBtn>
        </ContentHeader>
        <Content>
        {loading ? <Loader/> :
        <Table hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>League Name</th>
                    <th>Season Name</th>
                    <th>League Name</th>
                    <th>Stage Name</th>
                </tr>
            </thead>
            <tbody>
            { mainDataResult && mainDataResult?.data?.map((item: any, index: any) => (
                <tr key={index} onClick={() => viewSetting(item._id)}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.CurrentLeagueName}</td>
                    <td>{item.CurrentSeason?.SeasonName}</td>
                    <td>{item.CurrentLeague?.LeagueName}</td>
                    <td>{item.CurrentStage?.StageName}</td>
                    <td>
                    <> 
                        <MdCreate style={{color: "green", marginRight: "1.5rem"}} onClick={() => toggle(item)}/>
                        {/* <MdRestoreFromTrash onClick={() => toggleDeleteModal(index)} style={{color: "red"}} /> */}
                        </> 
                    </td>
                </tr>
            )) }
            </tbody>
        </Table>
        }
        </Content>
        <Modal 
        isOpen={modal}
        toggle={toggle}
        modalTransition={{ timeout: 200 }}
        size="md" contentClassName="modal-box">
        <ModalHeader>
          EDIT SETTINGS
        </ModalHeader>
        <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
            
          <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
            <CreateBtn className="red" onClick={(e) => update(e)}
              style={{ background: "#000229", color: "white", marginRight: "1rem" }} >
                CONFIRM
            </CreateBtn>
            <CreateBtn className="green"
              onClick={toggle}
              style={{ background: "red", color: "white", marginRight: "1rem", }}>
              CANCEL
            </CreateBtn>
          </div>
        </ModalBody>
        </Modal>
        </Container>
    )
}

export default ViewSetting;