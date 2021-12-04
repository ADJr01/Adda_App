import styled from "styled-components";


export const ChatViewUI = styled.div`
  border: 1px solid transparent;
  width: 300px;
  height: 550px;
  margin: auto;
  padding: 20px;
  border-radius: 24px;
`;

export const ChatWindow = styled.div`
  border: 1px solid #222;
  border-radius: 18px;
  background: #fff;
  width: 100%;
  height: calc(100% - 50px);
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;
export const ChatHeader = styled.div`
  background: #ededed;
  padding: 0.7rem;
  margin: -10px -10px 5% -10px;
  text-align: left;
  border-bottom: 1px solid #2222;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
`;

export const ChatImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #3d3d3d;
  border-radius: 50%;
`;

export const ChatHeaderContents = styled.div`
  margin-top: 0.3rem;
  margin-left: 0.5rem;
  display: flex;
  flex-flow: column wrap;
`;

export const ChatHeaderContentsUser = styled.h2`
  align-self: flex-start;
  margin: 0;
  padding: 0;
  opacity: 0.8;
`;

export const HeaderContentStatus = styled.div`
  display: flex;
  padding: 1px;
`;

export const  HeaderContentStatusText = styled.h6`
  margin: 0;
  padding: 0;
  opacity: 0.8;

`;

export const HeaderContentStatusLogo = styled.div`
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: rgb(5, 238, 5);
  margin: 0.15rem;
`;
export const ChatList = styled.div`
  background: #ddd;
  margin: 1px;
`

const Chat = styled.div`
  background: #72b8ff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  display: inline-block;
  padding: 10px;
  color: #fff;
  font-weight: lighter;
  font-size: small;
  box-shadow: 0 8px 32px 0 rgba(31, 114, 135, 0.37);
  margin: 2px;
  position: relative;
  &:hover{
    filter: brightness(0.9);
    cursor: pointer;
  }
`;

export const That = styled(Chat)`
  float: left;
  clear: both;
  border-top-left-radius: 0;
  &::before{
    content: "";
    width: 0;
    height: 0;
    display: block;
    border-left: 5px solid transparent;
    border-right: 5px solid #72b8ff;
    border-top: 5px solid #72b8ff;
    border-bottom: 5px solid transparent;
    position: absolute;
    top: 0;
    left: -10px;
  }
`;

export const This = styled(Chat)`
  float: right;
  clear: both;
  border-top-right-radius: 0;
  background: #00cf8a;
  &::before{
    content: "";
    width: 0;
    height: 0;
    display: block;
    border-left: 5px solid #00cf8a;
    border-right: 5px solid transparent;
    border-top: 5px solid #00cf8a;
    border-bottom: 5px solid transparent;
    position: absolute;
    top: 0;
    right: -10px;
  }
`;

export const InputContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #ededed;
  height: 40px;
  left: 0;
  border-top: 1px solid #ddd;
`;

export const TextInput = styled.input`
  outline: none;
  padding: 10px;
  box-sizing: border-box;
  font-size: 18px;
  width: 250px;
  height: 40px;
  display: inline-block;
  color: #1d1b1b;
  font-weight: 100;
  background: #ddd;
  border-top-right-radius: 20px;
  border: 1px solid #2222;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
export const ChatSent = styled.button`
  width: 40px;
  height: 30px;
  padding: 0;
  display: inline-block;
  border: none;
  color: #00d025;
  background: none;
  position: relative;
  top: -3px;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover{
    background: #00d025;
    color: white;
    border-bottom-right-radius: 10px;
  }
  &:active{
    color: #00cf8a;
    background: white;
  }

`;






