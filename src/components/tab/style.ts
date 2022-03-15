import styled from "styled-components";

export const Tab = styled.div`
width: 100%;
padding: 1rem 1.5rem;
color: #000729;
@media (max-width: 769px) {
 padding: 2rem 0;
}
`

export const Nav = styled.ul`
width: 80%;
margin: 0 0 0rem;
display: flex;
align-items: left;
padding-left: 0px;
border-bottom: 1px solid #FFB422;
&.active {
}
@media (max-width: 768px) {
  width: 90%;
  flex-wrap: wrap;
  margin: 0 auto;
border-bottom: 0px solid #FFB422;
}
`

export const List = styled.li`
margin-right: 1rem;
font-weight: 500;
font-size: 1rem;
list-style: none;
border-bottom: 0px;
padding: .65rem 3rem;
text-align: left;
  cursor: pointer;
  transition: all 0.7s;
  background: #000292;
  color: white;
  &:nth-child(2) {
    border-radius: 0;
  }
  &:hover {
    background: #000292;
  }
  &.active {
    background: #FFB422;
  }
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-bottom:  .6rem;
  }
  @media (min-width: 769px) and (max-width: 1110px) {
    font-size: .6rem;
     padding: .65rem 1.5rem;
  }
`

// export const List = styled.li`

// `