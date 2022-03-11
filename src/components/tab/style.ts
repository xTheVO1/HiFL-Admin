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
width: 60%;
margin: 0 0 0rem;
display: flex;
align-items: left;
padding-left: 0px;
&.active {
  background: red;
}
@media (max-width: 768px) {
  width: 90%;
}`

export const List = styled.li`
margin-right: 1rem;
font-weight: 500;
font-size: 1rem;
list-style: none;
padding: .65rem 3rem;
text-align: left;
  cursor: pointer;
  transition: all 0.7s;
  border-bottom: 1px solid #0013FF;
  background: #000292;
  color: white;
  &:nth-child(2) {
    border-radius: 0;
  }
  &:hover {
    background:  #000292;
  }
  &.active {
    background: #FFB422;
  }
`

// export const List = styled.li`

// `