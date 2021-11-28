import styled from "styled-components";
import {devices} from "../../Navigation/UI/Screens";

export const ContentUI = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: normal;
  @media ${devices.largeTablet}{
    flex: 2 0;
    width: 100%;
  }
`;