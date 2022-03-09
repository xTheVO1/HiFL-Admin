import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.colors.primary};
`;
export const Content = styled.div`
  display: flex;
  // justify-content: space-between;  
  flex-wrap: wrap;
  background: white;
  padding: 1rem .5rem;
`;