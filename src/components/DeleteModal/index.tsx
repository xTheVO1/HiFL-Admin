import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Modal, 
    ModalHeader, ModalBody
} from "reactstrap"
import { Btn } from '../playerCardV2/style';
  
interface PropsType {
    toggle?: any;
    id?: any;
    modal?: any;
    actionCall?: any;
}
function DeleteModal({toggle, id, modal, actionCall}: PropsType) {
   


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
                    <Btn className="red" onClick={() => actionCall()} 
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