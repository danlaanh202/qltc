import Head from "next/head";
import styled from "styled-components";
import VaccineRegisterForm from "../../components/form/VaccineRegisterForm";

const StyledRegContainer = styled.div`
  max-width: 850px;
  width: 100%;
  margin: auto;
  min-height: 100vh;
  padding: 20px;
  color: #6d6e70;
  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.1;
    margin-bottom: 30px;
  }
  .description {
    font-size: 15px;
    line-height: 1.1;
    margin-bottom: 10px;
  }
  .form-title {
    font-size: 15px;
    line-height: 1.1;
    font-weight: 600;
  }
`;
const StyledRow = styled.div``;
const vaccine_register = () => {
  return (
    <StyledRegContainer>
      <Head>
        <title>Đăng ký tiêm chủng</title>
      </Head>
      <h2 className="title">ĐĂNG KÝ TIÊM CHỦNG</h2>
      <div className="description">
        Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi đến làm thủ tục
        tại quầy Lễ tân cho Quý Khách hàng, việc đăng ký thông tin tiêm chủng
        chưa hỗ trợ đặt lịch hẹn chính xác theo giờ.
      </div>
      <div className="form-title">THÔNG TIN NGƯỜI TIÊM</div>

      <VaccineRegisterForm />
    </StyledRegContainer>
  );
};

export default vaccine_register;
