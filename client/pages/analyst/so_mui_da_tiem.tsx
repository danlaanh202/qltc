import React from "react";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import MainTop from "../../components/MainTop";
import SoMuiDaTiemTable from "../../components/table/SoMuiDaTiemTable";
const StyledCreateContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;
`;
const so_mui_da_tiem = () => {
  return (
    <Layout>
      <StyledCreateContainer>
        <MainTop
          title="Số mũi đã tiêm"
          backTitle="Thống kê"
          backRoute="/analyst"
        />
        <div className="container">
          <SoMuiDaTiemTable />
        </div>
      </StyledCreateContainer>
    </Layout>
  );
};

export default so_mui_da_tiem;
