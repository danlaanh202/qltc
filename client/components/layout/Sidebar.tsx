import { ReactNode } from "react";
import styled from "styled-components";
import SidebarItem from "../sidebar/SidebarItem";
import HomeIcon from "@mui/icons-material/Home";
import MedicationIcon from "@mui/icons-material/Medication";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { SetStateType } from "../../types";
const StyledSidebar = styled.div`
  width: 300px;
  height: 100%;
  padding: 28px 20px;
  background: white;
  border-right: 1px solid #e9e9e9;
  .logo-container {
    font-size: 24px;
    line-height: 30px;
    color: #282423;
    text-align: center;
    margin-bottom: 40px;
  }
`;
interface ISidebarList {
  title: string;
  link: string;
  icon: ReactNode;
}
export const sidebarList: ISidebarList[] = [
  {
    title: "Trang chủ",
    link: "/dashboard",
    icon: (
      <>
        <HomeIcon />
      </>
    ),
  },
  {
    title: "Quản lý thuốc tiêm",
    link: "/medicine_management",
    icon: (
      <>
        <MedicationIcon />
      </>
    ),
  },
  {
    title: "Quản lý bệnh nhân",
    link: "/patient_management",
    icon: (
      <>
        <AirlineSeatFlatIcon />
      </>
    ),
  },
  {
    title: "Quản lý phiếu tiêm",
    link: "/vaccine_paper",
    icon: (
      <>
        <ReceiptIcon />
      </>
    ),
  },
  {
    title: "Thống kê",
    link: "/analyst",
    icon: (
      <>
        <AnalyticsIcon />
      </>
    ),
  },
];
const Sidebar = ({ isShowSidebar }: { isShowSidebar: boolean }) => {
  return isShowSidebar ? (
    <StyledSidebar>
      <div className="logo-container">TTTC</div>
      {sidebarList.map((item, index) => (
        <SidebarItem itemTitle={item.title} link={item.link} icon={item.icon} />
      ))}
    </StyledSidebar>
  ) : (
    <></>
  );
};

export default Sidebar;
