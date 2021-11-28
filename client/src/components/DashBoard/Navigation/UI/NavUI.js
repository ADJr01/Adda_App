import styled from "styled-components";
import {devices} from "./Screens";

export const Nav = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  background: linear-gradient(to right bottom,
  rgba(255, 255, 255, 0.7),
  rgba(255, 255, 255, 0.3));
  border-radius: 2rem;

  @media ${devices.largeTablet} {
    flex: 0 1;
    order: 1;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    width: 100%;
  }


`;