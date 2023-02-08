import styled from "styled-components";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { useRouter } from "next/router";
import { ReactNode } from "react";
interface IBox {
  boxSize: number;
}
const ChoosenBoxContainer = styled.div<IBox>`
  width: ${(props) => props.boxSize}px;
  height: ${(props) => props.boxSize}px;
  border: 1px solid #2a388f;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background: #266663;
  color: white;
  flex-direction: column;
  cursor: pointer;
  .icon-container {
  }
  .title-container {
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
  }
`;
const ChoosenBox = ({
  href = "/",
  title = "",
  icon,
  boxSize = 260,
}: {
  href: string;
  title: string;
  icon: ReactNode;
  boxSize?: number;
}) => {
  const router = useRouter();
  return (
    <ChoosenBoxContainer
      boxSize={boxSize}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="icon-container">
        {/* <LocalHospitalIcon style={{ width: "60px", height: "60px" }} /> */}
        {icon}
        {/* <AccessibilityNewIcon style={{ width: "60px", height: "60px" }} /> */}
      </div>
      <div className="title-container">{title}</div>
    </ChoosenBoxContainer>
  );
};

export default ChoosenBox;
