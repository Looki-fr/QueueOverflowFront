import styled from "styled-components";

export const DropDownContainer = styled("div")`
  width: 14.5em;
`;

export const DropDownHeader = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 14.5 em;
  margin-bottom: 0.8em;
  padding: 0.4em 1em 0.4em 1em;
  font-weight: 500;
  font-size: 1.3rem;
  color: black;
  background: #ffffff;
  border: 1px solid black;
  border-radius: 30px;
`;

export const DropDownListContainer = styled("div")``;

export const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 1px solid black;
  box-sizing: border-box;
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;
  color: #899499;
  &:hover {
    color: black;
  }`;


export const options = ["Questions", "Exercises", "Users"];
