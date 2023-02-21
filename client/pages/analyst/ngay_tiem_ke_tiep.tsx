import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import MainTop from "../../components/MainTop";
import NgayTiemKeTiepTable from "../../components/table/NgayTiemKeTiepTable";
const StyledCreateContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;
`;
const ngay_tiem_ke_tiep = () => {
  return (
    <Layout>
      <StyledCreateContainer>
        <Head>
          <title>Thống kê ngày tiêm kế tiếp</title>
        </Head>
        <MainTop
          title="Ngày tiêm kế tiếp"
          backTitle="Thống kê"
          backRoute="/analyst"
        />
        <div className="container">
          <NgayTiemKeTiepTable />
        </div>
      </StyledCreateContainer>
    </Layout>
  );
};

export default ngay_tiem_ke_tiep;
