import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import SearchBox from "../../components/box/SearchBox";
import Layout from "../../components/layout/Layout";
import MainTop from "../../components/MainTop";
const StyledSearchContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;

  .box-container {
    flex: 1;
  }
`;

const search = () => {
  return (
    <Layout>
      <Head>
        <title>Tìm kiếm thông tin thuốc</title>
      </Head>
      <StyledSearchContainer>
        <MainTop
          backRoute="/medicine_management"
          backTitle="Quản lý thuốc tiêm"
          title="Tìm kiếm"
        />
        <div className="box-container">
          <SearchBox />
        </div>
      </StyledSearchContainer>
    </Layout>
  );
};

export default search;
