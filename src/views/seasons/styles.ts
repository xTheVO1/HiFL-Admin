import styled from "styled-components";

export const Container = styled.div`
    background-color: white;
    padding: 0rem 2rem;
    .search-input{
      border:1px solid #C7C7C7;
       padding:0 .5rem;
    }
    .search-btn{
      padding:.2rem 1rem;
       background:#000229;
        color:#ffffff;
    }
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
  .table:hover{
    cursor: pointer;
  }
 
`;