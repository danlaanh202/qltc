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
    position: relative;
    .search-input {
      padding: 16px;
      width: 100%;
    }
    .spinner {
      position: absolute;
      width: 24px;
      height: 24px;
      top: calc(50% - 10px);
      right: 20px;
      /* transform: translateY(-50%); */
      border: 2px dotted black;
      border-left: 2px solid transparent;
      border-radius: 100%;
    }
  }
  .search-item-container {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }
`;
const getData = async (searchQuery: string, setData: any, setLoading: any) => {
  try {
    await callApiServices.getThuocTiem(searchQuery, setData);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<IMedicine[]>([]);
  const [loading, setLoading] = useState(false);
  const searchQueryDebounce = useDebounce(searchQuery, 500);
  useEffect(() => {
    getData(searchQueryDebounce, setData, setLoading);
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
          onChange={(e) => {
            setLoading(true);
            setSearchQuery(e.target.value);
          }}
        />
        {loading && <div className="spinner"></div>}
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
