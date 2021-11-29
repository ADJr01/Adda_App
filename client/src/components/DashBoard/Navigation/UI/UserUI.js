import styled from "styled-components";
import {devices} from "./Screens";

export const UserUI = styled.div`
  width: 40%;
  height: 25%;
  margin: 1rem auto;

  @media ${devices.largeTablet}{
    display: none;
  }
`;

export const UserImgElem = styled.img`
  width: 100%;
  border-radius: 50%;
  border: 3px solid rgba(23, 23, 23, 0.4);
  &:hover{
    filter: brightness(1.1);
  }
`;

export const UserPElem = styled.p`
  color: rgb(21, 55, 56);

`;

export const Label = styled.label`
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: -3px auto;
  line-height: 30px;
  color: #007976;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background: rgba(78, 190, 194, 0.9);
    color: white;
  }

`;

export const LabelInput = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
`;