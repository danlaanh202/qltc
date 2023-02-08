import Link from "next/link";
import styled from "styled-components";

const MainTopContainer = styled.div`
  .title {
    margin: 20px 0;
    font-size: 20px;
    line-height: 1.1;
    a {
      color: #2a388f;
      font-size: inherit;
    }
    span {
      font-size: inherit;
    }
  }
`;
const MainTop = ({
  backTitle = "Trang chủ",
  backRoute = "/",
  title,
}: {
  backTitle: string;
  backRoute: string;
  title: string;
}) => {
  return (
    <MainTopContainer>
      <div className="title">
        <Link href={backRoute}>{backTitle} </Link> / <span>{title}</span>
      </div>
    </MainTopContainer>
  );
};

export default MainTop;
