import 'bootstrap/dist/css/bootstrap.min.css';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Modal, 
    ModalHeader, ModalBody
} from "reactstrap"
import { deletePlayerById } from '../../redux/actions/players';
import { Btn } from '../playerCard/style';
  
interface PropsType {
    toggle: any;
    id: any;
    modal: boolean;
}
function DeleteModal({toggle, id, modal}: PropsType) {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();

    const deletePlayer = () => {
        dispatch(deletePlayerById(id))
        navigate('/players')
    }
  
    return (
            <Modal isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 2000 }}>
                    <ModalHeader>
                        Delete Player
                    </ModalHeader>
                <ModalBody style={{textAlign: "center"}}>
                    <h4>Are you sure ?</h4>
                <div style={{display: "flex", justifyContent:"center"}}>
                    <Btn className="red" onClick={() => deletePlayer()} 
                    style={{background: "red", color:"white", marginRight:"1rem"}} >
                    YES
                    </Btn>
                    <Btn className="green" 
                    onClick={toggle} 
                    style={{background: "#000229", color:"white", marginRight:"1rem", }}>
                    NO
                    </Btn>
                </div>
                </ModalBody>
            </Modal>
    );
}
  
export default DeleteModal;