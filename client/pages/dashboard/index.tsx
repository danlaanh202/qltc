import Head from "next/head";
import styled from "styled-components";
import ChoosenBox from "../../components/box/ChoosenBox";
import Layout from "../../components/layout/Layout";
import { sidebarList } from "../../components/layout/Sidebar";
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
`;
const index = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <StyledContainer>
        {sidebarList.map(
          (item, index) =>
            index !== 0 && (
              <ChoosenBox
                title={item.title}
                href={item.link}
                icon={item.icon}
                boxSize={160}
              />
            )
        )}
      </StyledContainer>
    </Layout>
  );
};

export default index;
