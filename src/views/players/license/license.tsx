import React from "react";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Girl from "../../../assests/pic.jpeg"
import "./license.css"

// components

function Institutions({user}: any) {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    
    console.log(user)
    
    const style = {
        
    }
    // sending User ID
    return (
        <div className="box" id="license">
        <div className="header">
        </div>
        <div className="passport">
            <img src={Girl} alt="user"/>
        </div>
        <div className="form-box">
            <div className="name">
                <h2><span>{`${user?.User?.Firstname?.toUpperCase()}`}</span> {" "}{" "}  <span className="middle">{`${user?.User?.MiddleName?.toUpperCase()}`}</span>  {" "}{" "}   <span>{`${user?.User?.Lastname?.toUpperCase()} `}</span></h2></div> 
            <div className="form-control-box">
                <div className="form-group">
                    <label>TEAM</label>
                    <input type="text" name="team" value="TEAM"/>
                </div>
                <div className="form-group">
                    <label>BLOOD GRP</label>
                    <input type="text" name="team" value={user?.SportRecord?.Position?.toUpperCase()}/>
                </div>
                <div className="form-group">
                    <label>COURSE & LEVEL</label>
                    <input type="text" name="team" value={user?.AcademicRecord?.CourseLevel?.toUpperCase()}/>
                </div>
                <div className="form-group">
                    <label>MATRIC NO.</label>
                    <input type="text" name="team" value={user?.AcademicRecord?.MatricNumber?.toUpperCase()}/>
                </div>
            </div>
        </div>
        <p className="order">THIS LICENCE MUST BE PRESENTED IN COLOURED</p>
        <div className="footer">
        </div>
    </div>
    );
}

export default Institutions;