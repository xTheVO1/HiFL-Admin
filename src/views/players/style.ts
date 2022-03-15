import styled from "styled-components";


export const Container = styled.div`
    
`;
export const Form = styled.form`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
padding: 0 .5rem;
padding-top: 1rem;
`;
export const Content = styled.div`
    background: white;
    padding: 0 2rem;
`;
export const Section = styled.div`
    width:100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem; 
    justify-content: space-between;
    h4{
        color: rgb(216, 212, 212);
    }
`;
export const Input = styled.input`
    border-radius: 5px;
    border: 1px solid grey;
    width: 100%;
    padding: 8px;
`;

export const Label = styled.label`
    display: block;
    font-weight: 500;
`;

export const Outlet = styled.div`
   background: #FCFCFC;
   padding: 1.5rem;
`;

export const CreateBtn = styled.button`
    background: #000292;
    color: white;
    padding: 1rem 3rem;
    margin-left: 1rem;
   
`;

export const FormData = styled.div`
    width: 45%;

    margin-bottom: 1rem;
    @media(max-width: 800px) {
        width: 100%;
    }
`;

export const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2rem;
  & .submit{
    background: #FFB422;
    color: black;
}
`;

export const Table = styled.div`
    display: flex;
    background: #F8F8F8;
`;