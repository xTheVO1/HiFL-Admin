import styled from "styled-components";

export const Container = styled.div`
    background-color: white;
    padding: 0rem 2rem;

`;

export const Loader = styled.p`
text-align: center;
font-size: 2rem;
width: 100%;
margin: 0rem auto;
padding: 6rem ;
`;

export const Content = styled.div`
  display: flex;
  // justify-content: space-between;  
  flex-wrap: wrap;
  background: white;
  width: 100%;
  padding: 1rem .5rem;
  text-align: center;
  .no-data{
    text-align: center;
    margin: 3rem auto;
  } 
`;

export const Form = styled.form`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
padding: 0 .5rem;
padding-top: 2rem;
width: 90%;
margin: 0 auto;
& .form-header{
    border-bottom: 1px solid #C3C3C3;
    margin-top: 2rem ;
}
`;
