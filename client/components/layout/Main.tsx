import { ReactNode } from "react";
import styled from "styled-components";

const StyledMain = styled.div`
  background: white;
  height: 100%;
  flex: 1;
  position: relative;
`;
const Main = ({ children }: { children: ReactNode }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
