import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
const StyledAutoComplete = styled(Autocomplete)`
  height: 40px !important;
  .MuiFormControl-root {
    height: 100%;
    .MuiInputBase-root {
      padding: 0 !important;
      height: 100% !important;
    }
  }
`;
const StyledTextField = styled(TextField)`
  height: 100%;
`;
export default function ComboBox({
  itemList,
  setOuterVal,
}: {
  itemList: any[];
  setOuterVal: Dispatch<SetStateAction<any>>;
}) {
  return (
    <StyledAutoComplete
      disablePortal
      id="combo-box-demo"
      options={itemList}
      getOptionLabel={(option) => option.name}
      sx={{}}
      onChange={(e, v) => setOuterVal(v)}
      renderInput={(params) => <StyledTextField {...params} />}
    />
  );
}
