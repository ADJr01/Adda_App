import styled from "styled-components";
import {devices} from "../../Navigation/UI/Screens";

export const CardsUI = styled.div`
  box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.282);
  border-radius: 1rem;
  padding: 1rem;
  overflow: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  
  @media ${devices.largeTablet}{
    margin: 1rem 1rem;
  }

`;

export const Card = styled.div`
  display: flex;
  background: linear-gradient(
          to left top,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0.5)  
  );
  border-radius: 1rem;
  margin: 1rem 0rem;
  padding: 1rem;
  box-shadow: 12px 12px 24px rgba(122, 122, 122, 0.212),-12px -12px 24px rgba(122, 122, 122, 0.212);
  justify-content: flex-start;
`;

export const CardInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.256rem 0.3rem;
  padding: 0.2rem 1rem;
`

export const CardImgDiv = styled.div`
  margin: 0.15rem 0.256rem;
  width: clamp(82px,68px,4rem);
  height: clamp(82px,64px,4rem);
`;

export const CardImgElem = styled.img`
  width: 100%;
  height: 90%;
  border-radius: 50%;
`;

export const OptionsUI = styled.div`
  padding: 1rem;
  margin: 0.2rem;
  display: flex;
  flex-flow: row wrap;
`;

export const OptionUI = styled.button`
  flex: 1 0 auto;
  color: #222222;
  background: #D1D8EC;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 12px 12px 24px #b2b8c9, -12px -12px 24px #f0f8ff;
  padding: 4px;
  line-height: 1.6;
  margin: 0.2rem;
  border-radius: 24px;
  &:hover {
    background: rgb(217, 234, 236);
  }
`;

export const OptionActive = styled(Option)`
  background: rgb(216, 219, 219);
`;

export const FriendOperate = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 3px;
`;

export const FriendBTN = styled.button`
  flex: 1 0 auto;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
  padding: 2px 8px;
  border-radius: 10px;
  box-shadow: 6px 6px 12px #b2b8c9, -12px -12px 24px #f0f8ff;
  border: 1px solid transparent;
  background: rgba(0, 142, 255, 0.61);
  color: white;
  transition: 0.4s;

  &:hover {
    background: rgba(247, 250, 255, 0.61);;
    border: 1px solid royalblue;
    color: rgba(0, 142, 255, 0.61);;
  }
`;


//Cards Container and @media query implementation required