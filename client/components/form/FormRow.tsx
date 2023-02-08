import { ReactNode } from "react";
import styled from "styled-components";
interface INumberOfColProps {
  numberOfCol: number;
}
const StyledRowContainer = styled.div<INumberOfColProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.numberOfCol},
    minmax(0, 1fr)
  );
  gap: 20px;
`;
const FormRow = ({
  children,
  numberOfCol = 1,
}: {
  children: ReactNode;
  numberOfCol: 1 | 2 | 3;
}) => {
  return (
    <StyledRowContainer numberOfCol={numberOfCol}>
      {children}
    </StyledRowContainer>
  );
};

export default FormRow;
