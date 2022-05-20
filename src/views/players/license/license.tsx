import React, {useEffect} from "react";
import { Dispatch } from "redux"
import { useDispatch} from "react-redux"
import Girl from "../../../assests/pic.jpeg"
import "./license.css"
import { getPlayerLicense } from "../../../redux/actions/players";

// components

function Institutions({user}: any) {
    const dispatch: Dispatch<any> = useDispatch()
    
    useEffect(() => {
        // const getOfficial = async () => {
          dispatch(getPlayerLicense({user}));
        // };
        // getOfficial();
    
        // eslint-disable-next-line
      }, [dispatch]);
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