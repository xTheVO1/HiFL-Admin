import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.colors.primary};
`;

export const Loader = styled.p`
text-align: center;
font-size: 2rem;
width: 100%;
margin: 0rem auto;
padding: 6rem 0;
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