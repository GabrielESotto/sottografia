/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import axios from "axios";
import Snackbars, { State } from "../Snackbar/Snackbar";
import { SnackbarOrigin } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IDialog {
  open: boolean;
  funcClose: () => void;
  id: string;
}

export default function AlertDialogSlide({ open, funcClose, id }: IDialog) {
  const [message, setMessage] = React.useState("");

  const handleDeleteSchedule = async () => {
    await axios
      .delete(`http://localhost:3001/agenda/delete/${id}`)
      .then((res) => {
        setMessage(res.data.message);

        setTimeout(() => {
          window.location.reload();
        }, 200);
      })
      .catch((error) => {
        setMessage(error.response.data.errors);
      });
  };

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  return (
    <>
      <Snackbars message={message} state={state} setState={setState} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={funcClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Você tem certeza?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Quer deletar esse ensaio da agenda? Você não conseguirá mais
            recupera-lo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={funcClose}>Não</Button>
          <Button
            onClick={() => {
              funcClose();
              void handleDeleteSchedule();
              handleClick({ vertical: "bottom", horizontal: "right" });
            }}
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
