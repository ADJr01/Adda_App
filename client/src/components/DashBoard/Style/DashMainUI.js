import styled from "styled-components";
import wave from '../Assets/wave.png'

export const DashMainUI = styled.main`
  font-family: "Zen Antique", serif;
  min-height: 100vh;
  background: url(${wave}) bottom fixed no-repeat,
  linear-gradient(to right top,
  rgba(130, 241, 222, 0.71),
  rgba(0, 151, 255, 0.54));
  display: flex;
  align-items: center;
  justify-content: center;
`;