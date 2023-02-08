import styled from "styled-components";

import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
interface ISidebarProps {
  isActive: boolean;
}
const StyledSidebarItem = styled.div<ISidebarProps>`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
  color: ${(props) => (props.isActive ? "#fff" : "#858585")};
  background: ${(props) => (props.isActive ? "#266663" : "#fff")};
  border-radius: 4px;
  cursor: pointer;
  .icon {
    margin-right: 12px;
    font-size: 18px;
  }
  .sidebar-item {
    flex: 1;
    &_title {
      font-size: 18px;
      line-height: 26px;
    }
  }
`;
const SidebarItem = ({
  itemTitle,
  link,
  icon,
}: {
  itemTitle: string;
  link: string;
  icon: ReactNode;
}) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(router.asPath.includes(link));
    console.log(router.asPath);
  }, [router]);
  return (
    <StyledSidebarItem onClick={() => router.push(link)} isActive={isActive}>
      <div className="icon">{icon}</div>
      <div className="sidebar-item">
        <div className="sidebar-item_title">{itemTitle}</div>
      </div>
    </StyledSidebarItem>
  );
};

export default SidebarItem;
