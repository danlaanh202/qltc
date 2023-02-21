import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { filterList } from "../../utils";

const StyledFilterListBoxContainer = styled.div`
  width: 100%;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;

  margin-top: 30px;
`;
const FilterListBox = ({ setErr }: { setErr: (_bool: boolean) => void }) => {
  const [errors, setErrors] = useState(4);
  useEffect(() => {
    console.log(errors);
    if (errors > 0) {
      setErr(true);
    } else {
      setErr(false);
    }
  }, [errors]);
  return (
    <StyledFilterListBoxContainer>
      {filterList.map((item, index) => (
        <FilterItem data={item} index={index} setEr={setErrors} />
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
const FilterItem = ({
  data,
  index,
  setEr,
}: {
  data: string;
  index: number;
  setEr: Dispatch<SetStateAction<number>>;
}) => {
  const [checked, setChecked] = useState(false);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    flag && checked
      ? setEr((prev) => {
          return prev + 1;
        })
      : setEr((prev) => {
          return prev - 1;
        });
  }, [checked]);
  return (
    <FilterItemContainer>
      <div className="content">{data}</div>
      <div
        className="yes"
        onClick={() => {
          setFlag(true);
          setChecked(true);
        }}
      >
        Có <input type="radio" name={`radio-${index}`} checked={checked} />
      </div>
      <div
        className="no"
        onClick={() => {
          setFlag(true);
          setChecked(false);
        }}
      >
        Không <input type="radio" name={`radio-${index}`} checked={!checked} />
      </div>
    </FilterItemContainer>
  );
};
export default FilterListBox;
