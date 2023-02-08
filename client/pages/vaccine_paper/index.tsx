import styled from "styled-components";
import ChoosenBox from "../../components/box/ChoosenBox";
import Layout from "../../components/layout/Layout";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import EditIcon from "@mui/icons-material/Edit";
import Head from "next/head";
const StyledMedicineManagementContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
`;
const index = () => {
  return (
    <Layout>
      <Head>
        <title>Quản lý thuốc tiêm</title>
      </Head>
      <StyledMedicineManagementContainer>
        <ChoosenBox
          boxSize={180}
          href="/vaccine_paper/create"
          icon={
            <>
              <CreateIcon />
            </>
          }
          title="Thêm phiếu tiêm"
        />
        {/* <ChoosenBox
          boxSize={180}
          href="/vaccine_paper/search"
          icon={
            <>
              <SearchIcon />
            </>
          }
          title="Tìm kiếm bệnh nhân"
        /> */}
        <ChoosenBox
          boxSize={180}
          href="/vaccine_paper/list"
          icon={
            <>
              <EditIcon />
            </>
          }
          title="Lịch sử phiếu tiêm"
        />
      </StyledMedicineManagementContainer>
    </Layout>
  );
};

export default index;
