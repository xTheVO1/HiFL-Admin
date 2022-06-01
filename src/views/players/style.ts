import styled from "styled-components";

export const Container = styled.div`
   width: 100%; 
   background: white;
  & .modal-box{
    background: red !important;
   }
`;
export const Small= styled.small`
 font-size: 1.7rem;

`;
export const Image = styled.img`
   width: 170px;
//    height: 170px; 
   img{
   object-fit: contain;
    width: 100%;
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
    & .disabled{
        background: ${props => props.theme.colors.gray};
    }
    flex-wrap: wrap;
    margin-bottom: 1rem; 
    justify-content: space-between;
    h4{
        color: black;
    }
    h6{
        color: green;
    }
`;

export const Download = styled.button`
background:#000229;
color: white;   
font-size: .7rem;
padding: .2rem 1rem;
border: 0px;
cursor: pointer;
`;

export const Input = styled.input`
    border-radius: 5px;
    border: 1px solid ${props => props.theme.colors.gray};
    width: 100%;
    padding: 8px;
`;
export const TextArea = styled.textarea`
    border-radius: 5px;
    border: 1px solid ${props => props.theme.colors.gray};
    width: 100%;
    padding: 8px;
`;
export const FileInput = styled.input`
    border: 1px solid ${props => props.theme.colors.gray};
    width: 75%;
    padding: 8px;
   margin-right: 5%;
  
`;
export const Select = styled.select`
    border: 1px solid ${props => props.theme.colors.gray};
    width: 100%;
    padding: 8px;
    margin-top: 5px;
`;

export const Label = styled.label`
    display: block;
    font-weight: 500;
    span{
        color: green;
        float: right;
    }
`;

export const Outlet = styled.div`
   background: #FCFCFC;
   padding: 1.5rem;
   .user-table-head{
    display: flex;
    justify-content: space-between;
    width: 90%;
    // text-align: left;
  }
  .active{
      padding: 0px 8px;
      border-radius: 5px;
      background: #03A430;
      margin-right: .2rem;
  }
  .inactive{
    padding: 0px 5px;
    width: 18px;
    height: 12px;
    transform: rotate(90deg) scaleX(-1);
    border-radius: 6px;
    background: #EA1D24;
}
  .table-head{
    display: flex;
    justify-content: left;
    width: 84%;
  }
`;

export const CreateBtn = styled.button`
    background: #000229;
    color: white;
    padding: .6rem 2rem;
    margin-left: 1rem;
 
`;

export const FormHolder = styled.div`
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
        color: #000229;
        cursor: pointer;
        font-weight: 600;
        padding: .5rem .5rem;
    }
   
`;

export const FilesHolder = styled.div`
    width: 200px;
    height: 200px;
    margin-bottom: 1.5rem;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    span{
        color: #FFB422;
        font-weight: 700;
        cursor: pointer;
    }
    .no-files{
        background: ${props => props.theme.colors.gray};
        color: white;
        text-align: center;
        padding: 30% 0;
        width: 200px;
        height: 200px;
    }
`

export const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2rem;
  & .submit{
    background: #FFB422;
    color: black;   
}
.disabled{
    background: ${props => props.theme.colors.gray};
}
`;

export const Table = styled.div`
    background: #F8F8F8;
    display: flex;
    padding: 0rem 1rem;
    padding-top: .8rem;
    padding-bottom: .5rem;
    width: 100%;
    .players-header{
        width: 90%;
        display: flex;
        justify-content: space-between;

    }
    .players-header-flex{
        display: flex;
        justify-content: space-around;
        width: 60%;
    }
   
    .players-flex-header, .players-flex-start{
        display: flex;
        justify-content: flex-end;
        width: 50%;

        p{
            font-weight: 500;
           color:  #000229;
        }
        p:hover{
            cursor: pointer;
        }
        .active{
            color: #FFB422;
        }
    }
    .players-flex-start{
        justify-content: flex-start;
        svg{
            font-size: 1.5rem;
            padding-bottom: .2rem;
        }
    }
    .players-flex-header p,  .players-flex-start p{
        margin: 0 .5rem;
    }
   
    @media(max-width: 930px) {
        .players-header-flex{
            display: none;
        }
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

export const FileHolder = styled.div`
   width: 100%; 
   display: flex;
//    justify-content: space-around;
   font-weight: 500;
   svg{
       color: green;
       font-size: 1.5rem;
   }
`;

export const Red = styled.span`
   color: red;
`
export const Green = styled.div`
   color: green;
`
