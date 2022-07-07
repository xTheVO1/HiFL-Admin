import React from "react";
import { Container, Content } from "./styles";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/user";

// components
import ContentHeader from "../../components/ContentHeader";
import { H2 } from "../institutions/styles";
import { Table } from "reactstrap";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const items = useSelector((state: any) => state.auth)
  const loading = useSelector((state: any) => state.auth.loading)
  const mainDataResult = items && items ? items.users : [];

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const viewUser = (id:any) => {
    navigate(`/user/${id}`);
   }

  //    /teams
  // sending User ID
  return (
    <Container>
      <ContentHeader title="User(s)" children={""}></ContentHeader>
      <Content>
      {loading ? <Loader/>:
            mainDataResult.length === 0 ? <H2>NO DATA FOUND</H2> :
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Year</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                { Object.values(mainDataResult && mainDataResult).map((item: any, index: any) => (
                    <tr key={index} onClick={() => viewUser(item.Email)}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.Firstname}</td>
                        <td>{item.Lastname}</td>
                        <td>{item.Email}</td>
                        <td>{item.Role}</td>
                    </tr>
              )) }
                </tbody>
            </Table>
            }
      </Content>
    </Container>
  );
}

export default User;
