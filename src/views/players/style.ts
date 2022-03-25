import styled from "styled-components";


export const Container = styled.div`
   width: 100%; 
   background: white;
`;
export const Image = styled.img`
   width: 170px;
   height: 170px; 
   img{
   object-fit: contain;

   }
`;
export const Form = styled.form`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
padding: 0 .5rem;
padding-top: 1rem;
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
    padding: .6rem 2rem;
    margin-left: 1rem;
   
`;

export const FormData = styled.div`
    width: 45%;
    .no-image{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: relative;
        background: red;
    }
    svg{
        position: absolute;
        color: vlue;
    }
    margin-bottom: 1rem;
    @media(max-width: 1050px) {
        width: 100%;
    }
    .file{
        border: 0px;
    }
    .file-btn{
        margin-left: 1.5rem;
        color: #000292;
        cursor: pointer;
        font-weight: 600;
        padding: .5rem .5rem;
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
    background: #F8F8F8;
    display: flex;
    padding: 0rem 1rem;
    padding-top: .8rem;
    padding-bottom: .5rem;
    width: 100%;
    .header{
        width: 80%;
        display: flex;
        justify-content: space-between;

    }
    .flex{
        display: flex;
        justify-content: space-around;
        width: 60%;
    }
   
    .flex-header, .flex-start{
        display: flex;
        justify-content: flex-end;
        width: 50%;

        p{
            font-weight: 500;
           color:  #000292;
        }
        p:hover{
            cursor: pointer;
        }
        .active{
            color: #FFB422;
        }
    }
    .flex-start{
        justify-content: flex-start;
        svg{
            font-size: 1.5rem;
            padding-bottom: .2rem;
        }
    }
    .flex-header p,  .flex-start p{
        margin: 0 1rem;
    }
`;

export const Content = styled.div`
    background: white;
    padding: 0rem 2rem;
    padding-top: 2rem;
    .padding{
        margin-bottom: 2rem;
        justify-content: space-between;
        padding: 0 .5rem;
        padding-top: 1.5rem;
        padding-bottom: 1rem;
    }
`;