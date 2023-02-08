import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { Dispatch, SetStateAction } from "react";
const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  overflow: hidden;
  color: #282423;
  border-bottom: 1px solid #e9e9e9;
  .menu-icon-container {
    padding: 8px;
    cursor: pointer;
  }
  .header-title {
    margin-left: 36px;
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
  }
`;
const Header = ({
  setIsShowSidebar,
}: {
  setIsShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <StyledHeader>
      <div
        className="menu-icon-container"
        onClick={() => setIsShowSidebar((prev) => !prev)}
      >
        <MenuIcon />
      </div>
      <div className="header-title">Hệ thống quản trị thông tin tiêm chủng</div>
    </StyledHeader>
  );
};

export default Header;
