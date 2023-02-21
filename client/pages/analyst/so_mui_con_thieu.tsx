import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import MainTop from "../../components/MainTop";
import SoMuiConThieuTable from "../../components/table/SoMuiConThieuTable";
const StyledCreateContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;
`;
const so_mui_con_thieu = () => {
  return (
    <Layout>
      <StyledCreateContainer>
        <Head>
          <title>Thống kê số mũi còn thiếu</title>
        </Head>
        <MainTop
          title="Số mũi còn thiếu"
          backTitle="Thống kê"
          backRoute="/analyst"
        />
        <div className="container">
          <SoMuiConThieuTable />
        </div>
      </StyledCreateContainer>
    </Layout>
  );
};

export default so_mui_con_thieu;
