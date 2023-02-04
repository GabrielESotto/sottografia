/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IPhotos {
  title: string;
  event: string;
  image: any;
  _id: string;
}

interface PhotosContextType {
  title: string;
  event: string;
  image: any;
  url: string;
  message: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setEvent: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  photoData: IPhotos[];
  addPhoto: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
  updatePhoto: (id: string) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
}

interface PhotosContextProps {
  children?: ReactNode | undefined;
}

const PhotosContext = createContext({} as PhotosContextType);

export const PhotosProvider = ({ children }: PhotosContextProps) => {
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState("");
  const [image, setImage] = useState("");
  const [photoData, setPhotoData] = useState<IPhotos[]>([]);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const photoDataTwo: any = {
    title,
    event,
    image,
  };

  const formData: FormData = new FormData();
  const photoFormData: any = Object.keys(photoDataTwo).forEach((key) => {
    formData.append(key, photoDataTwo[key]);
  });

  formData.append("photo", photoFormData);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:3001/photos/get")
        .then((res) => {
          setPhotoData(res.data.file);
          setUrl(res.data.url);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const addPhoto = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3001/photos/add", formData)
      .then((res) => {
        setMessage("Foto adicionada com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  const updatePhoto = async (id: string) => {
    await axios
      .patch(`http://localhost:3001/photos/updateTitle/${id}`, {
        title,
      })
      .then((res) => {
        setMessage("Titulo atualizado com sucesso");

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch(() => setMessage("Informe um novo titulo"));
  };

  const deletePhoto = async (id: string) => {
    await axios
      .delete(`http://localhost:3001/photos/delete/${id}`)
      .then((res) => {
        setMessage("Foto deletada com sucesso");

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <PhotosContext.Provider
      value={{
        photoData,
        url,
        addPhoto,
        title,
        event,
        image,
        setTitle,
        setEvent,
        setImage,
        updatePhoto,
        deletePhoto,
        message,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};

export default PhotosContext;
