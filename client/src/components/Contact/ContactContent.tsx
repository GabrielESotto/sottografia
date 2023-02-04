/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "./ContactContent.css";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Snackbars, { State } from "../Snackbar/Snackbar";
import { SnackbarOrigin } from "@mui/material";

const ContactContent: React.FC = () => {
  const [nameEmail, setNameEmail] = useState("");
  const [ensaioEmail, setEnsaioEmail] = useState("");
  const [email, setEmail] = useState("");
  const [assuntoEmail, setAssuntoEmail] = useState("");
  const [mensagemEmail, setMensagemEmail] = useState("");
  const [messageSnackbar, setMessageSnackbar] = useState("");

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      nameEmail === "" ||
      email === "" ||
      assuntoEmail === "" ||
      mensagemEmail === ""
    ) {
      setMessageSnackbar("Preencha todos os campos vazios");
      return;
    }

    const templateParams = {
      from_name: nameEmail,
      message: mensagemEmail,
      email,
      subject: assuntoEmail,
      evento: ensaioEmail,
    };

    emailjs
      .send(
        "service_7ybtot8",
        "template_9ft2a5s",
        templateParams,
        "TONyKuY_5LEQEdudF"
      )
      .then((res) => {
        setMessageSnackbar(
          "Mensagem enviada com sucesso, obrigada pelo contato"
        );
        setNameEmail("");
        setEmail("");
        setAssuntoEmail("");
        setMensagemEmail("");
      })
      .catch((error) => {
        setMessageSnackbar(
          "Houve um erro, por favor tente novamente mais tarde"
        );
        console.log("Erro:", error);
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
      <div className="contact-container">
        <Snackbars
          message={messageSnackbar}
          state={state}
          setState={setState}
        />
        <div className="contact-content">
          <div className="wrapper-contact">
            <div className="wr-left">
              <form className="contact-form" onSubmit={handleSubmitEmail}>
                <h1>Contato Email</h1>
                <div className="wrapping-form">
                  <label>Seu nome</label>
                  <input
                    type="text"
                    value={nameEmail}
                    onChange={(e) => {
                      setNameEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="wrapping-form">
                  <label>Ensaio/Evento</label>
                  <select
                    value={ensaioEmail}
                    onChange={(e) => {
                      setEnsaioEmail(e.target.value);
                    }}
                  >
                    <option>Selecione o tipo de ensaio/evento</option>
                    <option>Individual</option>
                    <option>Casal</option>
                    <option>Familia</option>
                    <option>Eventos</option>
                    <option>Gestante</option>
                  </select>
                </div>
                <div className="wrapping-form">
                  <label>Seu email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="wrapping-form">
                  <label>Assunto</label>
                  <input
                    type="text"
                    value={assuntoEmail}
                    onChange={(e) => {
                      setAssuntoEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="wrapping-form">
                  <label>Mensagem</label>
                  <textarea
                    value={mensagemEmail}
                    onChange={(e) => {
                      setMensagemEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="wrapping-form">
                  <input
                    type="submit"
                    value="Enviar"
                    className="btn-submit"
                    onClick={handleClick({
                      vertical: "bottom",
                      horizontal: "right",
                    })}
                  />
                </div>
              </form>
            </div>

            <div className="wr-right">
              <h1>Contato via WhatsApp</h1>
              <p>
                Lorem Ipsum has been the industry standard dummy text ever since
                the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </p>
              <a
                target="_blank"
                href="https://wa.me/message/VKNMDYLUGUCHI1"
                rel="noreferrer"
              >
                <span>Contate-me</span> <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactContent;
