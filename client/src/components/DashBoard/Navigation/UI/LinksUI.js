import styled from "styled-components";
import {devices} from "./Screens";

export const LinksUI = styled.div`
  @media ${devices.largeTablet}{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    padding: 4px;
    margin: 1px 1px;
    overflow: hidden;
    scroll-behavior: smooth;
  }
`;

export const LinkItemUI = styled.div`
  display: flex;
  padding: 1rem 2rem;
  align-items: center;
  margin: 2rem 0.1rem 2rem 0;
  transition: 0.1s;
  cursor: pointer;
  
  &:hover{
    background: linear-gradient(
            to right bottom,
            rgba(79, 149, 194, 0.13),
            rgba(143, 230, 245, 0.25)
    );
    border-radius: 1rem;
  }
  
  @media ${devices.largeTablet}{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 2px;
    height: 100%;
    margin: 1px auto;
    
  }
  
`;
export const ActiveLinkItemUI = styled(LinkItemUI)`
  background: linear-gradient(to right bottom, #1b65967e, #6cdaeb98);
  border-radius: 1.4rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  &:hover{
    background: linear-gradient(
            to right bottom,
            #1b65967e,
            rgba(108, 218, 235, 0.91)
    );
    border-radius: 1.5rem;
    
  }
`;


export const LinkImg = styled.div`
  margin: 0.15rem 0.256rem;
  width: clamp(72px, 68px, 4rem);
  height: clamp(72px, 68px, 4rem);

  @media ${devices.largeTablet}{
    margin: 0.15rem 0.256rem;
    width: min(62px, 3rem);
    height: min(62px, 3rem);

  }
`;

export const LinkElemImg = styled.img`
  width: 100%;
  @media ${devices.largeTablet}{
    width: 90%;

  }
`;

export const LinkElemH2 = styled.h2`
  padding: 0.26rem 2rem;
  cursor: default;

  @media ${devices.largeTablet}{
    font-size: 16px;
  }
  
`;