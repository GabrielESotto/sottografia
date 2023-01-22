/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import "./Agenda.css";
import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import CustomPaginationActionsTable from "../../../components/Table/Table";
import axios from "axios";

const Agenda: React.FC = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [nameEvent, setNameEvent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateEvent, setDateEvent] = useState<string>("");
  const [hourEvent, setHourEvent] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleCreateForm = () => {
    setIsCreating((prev: boolean) => !prev);
  };

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3001/agenda/new", {
        nameEvent,
        description,
        dateEvent,
        hourEvent,
      })
      .then((res) => {
        setIsCreating(false);
        setMessage("Evento adicionado com sucesso!");

        setTimeout(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.errors);
      });
  };

  return (
    <>
      <div className="bg-loggedpage">
        <HeaderAdmin />
        <div className="container-agenda">
          <h1 className="title-agenda">Agenda de Ensaios</h1>
          {isCreating ? (
            <>
              <div className="wrapper-create">
                <div className="return">
                  <KeyboardBackspaceIcon
                    onClick={() => setIsCreating(false)}
                    sx={{
                      bgcolor: "transparent",
                      width: "30px",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <h1 className="title-create">Novo ensaio</h1>
                <form className="create-schedule">
                  <label className="label-create">Nome do evento</label>
                  <input
                    className="input-create"
                    type="text"
                    value={nameEvent}
                    onChange={(e) => setNameEvent(e.target.value)}
                  />

                  <label className="label-create">Descrição do evento</label>
                  <textarea
                    className="input-create textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <label className="label-create">Data do evento</label>
                  <input
                    className="input-create"
                    type="text"
                    value={dateEvent}
                    onChange={(e) => setDateEvent(e.target.value)}
                  />

                  <label className="label-create">Horário do evento</label>
                  <input
                    className="input-create"
                    type="text"
                    value={hourEvent}
                    onChange={(e) => setHourEvent(e.target.value)}
                  />

                  <button onClick={handleSubmitCreate} className="btn-create">
                    Adicionar
                  </button>
                  <div>{message && <h1>{message}</h1>}</div>
                </form>
              </div>
            </>
          ) : (
            <div className="wrapper-list">
              <button onClick={handleCreateForm} className="new-schedule">
                Novo Ensaio
              </button>
              <CustomPaginationActionsTable />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Agenda;
