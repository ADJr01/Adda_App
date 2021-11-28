import styled from "styled-components";


export const Option = styled.button`
  flex: 1 0 auto;
  color: #222222;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 64px 0 rgba(51, 165, 159, 0.2);
  padding: 4px;
  line-height: 1.6;
  margin: 0.2rem;
  border-radius: 24px;
  
  &:hover{
    background: rgb(217, 234, 236);
  }
`

export const OptActive = styled(Option)`
  background: rgb(216, 219, 219);
`;