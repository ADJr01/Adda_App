import styled from "styled-components";


export const Status = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(122, 122, 122, 0.282);
`;


export const StatusSearch = styled.input`
  background: linear-gradient(
          to right bottom,
          rgba(222, 248, 248, 0.7),
          rgba(255, 255, 255, 0.3)
  );
  border: 1px solid rgba(34, 34, 34, 0.19);
  width: 80%;
  padding: 0.6rem;
  border-radius: 2rem;
  &:focus{
    outline: none;
  }

`;