/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Agenda } from "../interface/typeAgenda";

interface GetAgendaContextType {
  agendaData: Agenda[];
  errorMessage: string;
}

interface GetAgendaContextProps {
  children?: ReactNode | undefined;
}

const GetAgendaContext = createContext({} as GetAgendaContextType);

export const GetAgendaProvider = ({ children }: GetAgendaContextProps) => {
  const [agendaData, setAgendaData] = useState<Agenda[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:3001/agenda/get")
        .then((res) => {
          setAgendaData(res.data.schedules);
        })
        .catch((error) => {
          setErrorMessage(error);
          console.log(error);
        });
    })();
  }, []);

  return (
    <GetAgendaContext.Provider value={{ agendaData, errorMessage }}>
      {children}
    </GetAgendaContext.Provider>
  );
};

export default GetAgendaContext;
