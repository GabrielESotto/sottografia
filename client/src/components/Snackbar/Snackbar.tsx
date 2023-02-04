/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface ISnack {
  message: string;
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

const Snackbars: React.FC<ISnack> = ({ message, state, setState }: ISnack) => {
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
};

export default Snackbars;
