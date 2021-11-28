import styled from "styled-components";
import {devices} from "../Navigation/UI/Screens";

export const ProfileContainerUI = styled.section`
  background: white;
  min-height: 90vh;
  width: min(1398px, 90%);
  background: linear-gradient(
          to right bottom,
          rgba(255, 255, 255, 0.7),
          rgba(255, 255, 255, 0.3)
  );
  border-radius: 2rem;
  z-index: 2;
  backdrop-filter: blur(2rem);
  display: flex;

  @media ${devices.largeTablet}{
    flex-direction: column;
  }
`