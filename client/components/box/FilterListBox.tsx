import styled from "styled-components";
import { filterList } from "../../utils";

const StyledFilterListBoxContainer = styled.div`
  width: 100%;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;

  margin-top: 30px;
`;
const FilterListBox = () => {
  return (
    <StyledFilterListBoxContainer>
      {filterList.map((item, index) => (
        <FilterItem data={item} index={index} />
      ))}
    </StyledFilterListBoxContainer>
  );
};
const FilterItemContainer = styled.div`
  display: flex;
  .content {
    flex: 1;
    border-right: 1px solid #dbdbdb;
    border-top: 1px solid #dbdbdb;
    padding: 4px;
  }
  .yes {
    border-right: 1px solid #dbdbdb;
    border-top: 1px solid #dbdbdb;
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .no {
    border-top: 1px solid #dbdbdb;
    padding: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
const FilterItem = ({ data, index }: { data: string; index: number }) => {
  return (
    <FilterItemContainer>
      <div className="content">{data}</div>
      <div className="yes">
        Có <input type="radio" name={`radio-${index}`} />
      </div>
      <div className="no">
        Không <input type="radio" name={`radio-${index}`} />
      </div>
    </FilterItemContainer>
  );
};
export default FilterListBox;
