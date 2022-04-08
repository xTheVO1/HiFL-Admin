import styled from "styled-components";

export const Container = styled.div`
 padding: 1rem 3rem 2rem 3rem;
background: white;
.header{
    width 97%;
    margin: 0 auto;
    margin-bottom: 3rem;
    background: white;

}
`;

export const Content = styled.div`
  width 97%;
  margin: 0 auto;
  background: #FCFCFC;
 padding: 0rem 3rem 2rem 3rem;
.container{
    padding-top: 66px;
}
`;
export const Card = styled.p`
  background: white;
  font-weight: 700px;
  font-size: 20px;
  padding: 1rem 86px 1rem 51px;
  margin: 0px 0px 23px 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
  :hover{
    cursor: pointer;
  }
`;

export const BtnCard = styled.p`
  background: white;
  font-weight: 700px;
  font-size: 20px;
  padding: 1.5rem 1rem 1.5rem 1rem;
  margin: 0px 0px 23px 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
  :hover{
    cursor: pointer;
  }
`;

export const CreateBtn = styled.a`
  background: #000292;
  color: white;
  padding: 0.6rem 2rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  text-decoration: none;
`;

export const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2rem;
  & .submit {
    background: #ffb422;
    color: black;
  }
`;
