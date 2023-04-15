import React from "react";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { css } from "@emotion/react";

import { colors } from "../styles/colors";

const Button = (props) => {
  return (
    <MuiButton
      style={{
        background: colors.blues[500],
        textTransform: "none",
        color: "white",
        ...(props.style || {})
      }}
      variant="outlined"
      {...props}
    >
      {props.children}
    </MuiButton>
  );
};

export default Button;
