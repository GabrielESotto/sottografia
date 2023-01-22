/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IModal {
  open: boolean;
  funcClose: () => void;
  name: string;
  description: string;
  date: string;
  hour: string;
  id: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setHour: React.Dispatch<React.SetStateAction<string>>;
}

export default function BasicModal({
  open,
  funcClose,
  name,
  description,
  date,
  hour,
  setName,
  setDescription,
  setDate,
  setHour,
  id,
}: IModal) {
  const [message, setMessage] = React.useState("");

  const handleUpdateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .patch(`http://localhost:3001/agenda/update/${id}`, {
        nameEvent: name,
        description,
        dateEvent: date,
        hourEvent: hour,
      })
      .then((res) => {
        setMessage("Ensaio atualizado com sucesso!");

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        setMessage(error.response.data.errors);
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={funcClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="title-create">Editar ensaio</h1>
          <form className="create-schedule">
            <label className="label-create">Nome do evento</label>
            <input
              className="input-create"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="label-create">Descrição do evento</label>
            <textarea
              className="input-create textarea"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <label className="label-create">Data do evento</label>
            <input
              className="input-create"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="label-create">Horário do evento</label>
            <input
              className="input-create"
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            />

            <button onClick={handleUpdateSchedule} className="btn-create">
              Atualizar
            </button>
            {message && <h1>{message}</h1>}
          </form>
        </Box>
      </Modal>
    </>
  );
}
