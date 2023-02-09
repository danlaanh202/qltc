import { useEffect, useState } from "react";
import styled from "styled-components";
import useDebounce from "../../hooks/useDebounce";
import { IMedicine } from "../../types";
import callApiServices from "../../utils/callApiServices";
import MedicineSearchItem from "../searchitem/MedicineSearchItem";

const StyledSearchBox = styled.div`
  width: 100%;

  height: 100%;
  .input-container {
    margin-bottom: 20px;
    .search-input {
      padding: 16px;
      width: 100%;
    }
  }
  .search-item-container {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<IMedicine[]>([]);
  const searchQueryDebounce = useDebounce(searchQuery, 500);
  useEffect(() => {
    callApiServices.getThuocTiem(searchQueryDebounce, setData);
  }, [searchQueryDebounce]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <StyledSearchBox>
      <div className="input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm tên thuốc"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="search-item-container">
        {data?.length > 0 &&
          data.map((item) => (
            <MedicineSearchItem key={item?.ma_so_thuoc} data={item} />
          ))}
      </div>
    </StyledSearchBox>
  );
};

export default SearchBox;
