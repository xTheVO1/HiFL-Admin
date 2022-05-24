import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Modal,
    ModalHeader, ModalBody
  } from "reactstrap";
import { Dispatch } from "redux";
import { BtnDiv, CreateBtn, Form, Label, Section, Select, TextArea } from "../../views/players/style";
import { Btn } from "../playerCard/style";
import {getPlayerById, updatePlayer } from "../../redux/actions/players";
interface ModalProps {
    isModal: boolean;
    toggle: any;
    action: (e:any) => void;
    user: {};
    accredictItem: any;
}

export default function Content ({
                                isModal,
                                toggle, 
                                user, 
                                accredictItem }: ModalProps) {

    const { id } = useParams();                                       
    const dispatch: Dispatch<any> = useDispatch();
                                    
    const [inputObject, setObject] = useState({AccreditationComment: "",
                                               Approval: ""
                                            });

    const changeStatus = (e: any) => {
    const AccreditationHistories: any = [];
    const details = {
        _id : id,
        params: {
            AccreditationHistories: AccreditationHistories.push({
                AccreditationComment: inputObject.AccreditationComment, 
                Approval: inputObject.Approval, 
                YearAccredicted: 2022
            })
        }
    }
    dispatch(updatePlayer(details));
    dispatch(getPlayerById(id));
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
  };

  const status = [
    { type: "APPROVED", value: "APPROVED" },
    { type: "DISAPPROVED", value: "DISAPPROVED" }
  ]

    return (
        <Modal isOpen={isModal}
        toggle={toggle}
        modalTransition={{ timeout: 200 }}
        size="md" contentClassName="modal-box">
        <ModalHeader>
          ACCREDITATION
        </ModalHeader>
        <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
        <Form onSubmit={changeStatus}>
            <Section>
            <Label>APPROVAL </Label><span style={{color: "green"}}>{accredictItem?.Approval}</span>
            <Select
                name="Approval"
              onChange={(e) => handleChange(e)} required
            >
                <option>Select a status</option>
                {status.map(item => (
                <option value={item.value}>{item.type}</option>
                ))}
            </Select>
            </Section>
            <Section>
            <Label>COMMENTS</Label>
            <TextArea
                name="AccreditationComment"
              onChange={(e) => handleChange(e)} required
            value={accredictItem?.AccreditationComment}
                />
            </Section>
            <BtnDiv>
            <CreateBtn type="submit">SAVE</CreateBtn>
            </BtnDiv>
        </Form>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <Btn className="red" onClick={(e) => changeStatus(e)}
              style={{ background: "green", color: "white", marginRight: "1rem" }} >
              PROCEED
            </Btn> */}
            <Btn className="green"
              onClick={toggle}
              style={{ background: "red", color: "white", marginRight: "1rem", }}>
              CANCEL
            </Btn>
          </div>
        </ModalBody>
      </Modal>
    )
}