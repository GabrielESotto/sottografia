/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "./Photos.css";
import { useState, useContext } from "react";
import { MdArrowBack } from "react-icons/md";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import PhotosContext from "../../../contexts/PhotosContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { SnackbarOrigin } from "@mui/material";
import Snackbars, { State } from "../../../components/Snackbar/Snackbar";

const Photos: React.FC = () => {
  const {
    addPhoto,
    title,
    url,
    setTitle,
    setEvent,
    setImage,
    updatePhoto,
    deletePhoto,
    photoData,
    message,
  } = useContext(PhotosContext);
  const [isAdding, setIsAdding] = useState(false);
  const [topping, setTopping] = useState("Todas fotos");

  const handleChangePage = () => {
    setIsAdding((prev) => !prev);
  };

  const handleFile = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files !== null) {
      const file = target.files[0];
      setImage(file);
    }
  };

  const onOptionChange = (e: any) => {
    setTopping(e.target.value);
  };

  const [state, setState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  return (
    <>
      <HeaderAdmin />
      <Snackbars message={message} state={state} setState={setState} />
      <div
        className={
          topping === "Todas fotos"
            ? "container-photos"
            : "container-photos little"
        }
      >
        <div className="wrapper-photos">
          {isAdding ? (
            <>
              <div className="head-content">
                <form className="form-add" onSubmit={addPhoto}>
                  <div onClick={handleChangePage} className="position-arrow">
                    <MdArrowBack className="arrow" /> <span>Return</span>
                  </div>
                  <input
                    type="text"
                    className="input-name"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <select
                    onChange={(e) => {
                      setEvent(e.target.value);
                    }}
                  >
                    <option>Selecione um evento</option>
                    <option>Individual</option>
                    <option>Casal</option>
                    <option>Familia</option>
                    <option>Gestante</option>
                    <option>Eventos</option>
                  </select>
                  <input
                    type="file"
                    className="input-file"
                    onChange={handleFile}
                    multiple={true}
                  />
                  <input
                    type="submit"
                    className="submit"
                    onClick={handleClick({
                      vertical: "bottom",
                      horizontal: "right",
                    })}
                    value="Adicionar"
                  />
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="wrapper-buttons">
                <button onClick={handleChangePage} className="add-photo">
                  Adicionar foto ao portfólio
                </button>
              </div>
            </>
          )}
          <div className="filters">
            <div className="each-filter">
              <input
                type="radio"
                value="Todas fotos"
                name="filter"
                checked={topping === "Todas fotos"}
                onChange={onOptionChange}
              />
              <label>Todas fotos</label>
            </div>
            <div className="each-filter">
              <input
                type="radio"
                value="Individual"
                name="filter"
                checked={topping === "Individual"}
                onChange={onOptionChange}
              />
              <label>Individual</label>
            </div>
            <div className="each-filter">
              <input
                type="radio"
                value="Casal"
                name="filter"
                checked={topping === "Casal"}
                onChange={onOptionChange}
              />
              <label>Casal</label>
            </div>
            <div className="each-filter">
              <input
                type="radio"
                value="Familia"
                name="filter"
                checked={topping === "Familia"}
                onChange={onOptionChange}
              />
              <label>Familia</label>
            </div>
            <div className="each-filter">
              <input
                type="radio"
                value="Eventos"
                name="filter"
                checked={topping === "Eventos"}
                onChange={onOptionChange}
              />
              <label>Eventos</label>
            </div>
            <div className="each-filter">
              <input
                type="radio"
                value="Gestante"
                name="filter"
                checked={topping === "Gestante"}
                onChange={onOptionChange}
              />
              <label>Gestante</label>
            </div>
          </div>
          <div className="show-photos">
            {topping === "Todas fotos" &&
              photoData.map((photo) => {
                return (
                  <div key={photo.image} className="box-photo">
                    <span className="subject-photos">
                      Evento: {photo.event}
                    </span>
                    <span className="subject-photos">
                      Titulo: {photo.title}
                    </span>
                    <img
                      className="image"
                      src={`${url}${photo.image}`}
                      alt={photo.title}
                      loading="lazy"
                    />
                    <div className="commands">
                      <input
                        className="input-title"
                        type="text"
                        placeholder="Altere o titulo"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                      <ChangeCircleIcon
                        className="change"
                        onClick={async () => {
                          await updatePhoto(photo._id);
                          handleClick({
                            vertical: "bottom",
                            horizontal: "right",
                          });
                        }}
                      />

                      <DeleteIcon
                        className="delete"
                        onClick={async () => await deletePhoto(photo._id)}
                      />
                    </div>
                  </div>
                );
              })}
            {topping === "Individual" &&
              photoData.map((photo) => {
                return (
                  photo.event === "Individual" && (
                    <div key={photo.image} className="box-photo">
                      <span className="subject-photos">
                        Evento: {photo.event}
                      </span>
                      <span className="subject-photos">
                        Titulo: {photo.title}
                      </span>
                      <img
                        className="image"
                        src={`${url}${photo.image}`}
                        alt={photo.title}
                        loading="lazy"
                      />
                      <div className="commands">
                        <input
                          className="input-title"
                          type="text"
                          placeholder="Altere o titulo"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                        <ChangeCircleIcon
                          className="change"
                          onClick={async () => {
                            await updatePhoto(photo._id);
                            handleClick({
                              vertical: "bottom",
                              horizontal: "right",
                            });
                          }}
                        />

                        <DeleteIcon
                          className="delete"
                          onClick={async () => await deletePhoto(photo._id)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            {topping === "Familia" &&
              photoData.map((photo) => {
                return (
                  photo.event === "Familia" && (
                    <div key={photo.image} className="box-photo">
                      <span className="subject-photos">
                        Evento: {photo.event}
                      </span>
                      <span className="subject-photos">
                        Titulo: {photo.title}
                      </span>
                      <img
                        className="image"
                        src={`${url}${photo.image}`}
                        alt={photo.title}
                        loading="lazy"
                      />
                      <div className="commands">
                        <input
                          className="input-title"
                          type="text"
                          placeholder="Altere o titulo"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                        <ChangeCircleIcon
                          className="change"
                          onClick={async () => {
                            await updatePhoto(photo._id);
                            handleClick({
                              vertical: "bottom",
                              horizontal: "right",
                            });
                          }}
                        />

                        <DeleteIcon
                          className="delete"
                          onClick={async () => await deletePhoto(photo._id)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            {topping === "Casal" &&
              photoData.map((photo) => {
                return (
                  photo.event === "Casal" && (
                    <div key={photo.image} className="box-photo">
                      <span className="subject-photos">
                        Evento: {photo.event}
                      </span>
                      <span className="subject-photos">
                        Titulo: {photo.title}
                      </span>
                      <img
                        className="image"
                        src={`${url}${photo.image}`}
                        alt={photo.title}
                        loading="lazy"
                      />
                      <div className="commands">
                        <input
                          className="input-title"
                          type="text"
                          placeholder="Altere o titulo"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                        <ChangeCircleIcon
                          className="change"
                          onClick={async () => {
                            await updatePhoto(photo._id);
                            handleClick({
                              vertical: "bottom",
                              horizontal: "right",
                            });
                          }}
                        />

                        <DeleteIcon
                          className="delete"
                          onClick={async () => await deletePhoto(photo._id)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            {topping === "Gestante" &&
              photoData.map((photo) => {
                return (
                  photo.event === "Gestante" && (
                    <div key={photo.image} className="box-photo">
                      <span className="subject-photos">
                        Evento: {photo.event}
                      </span>
                      <span className="subject-photos">
                        Titulo: {photo.title}
                      </span>
                      <img
                        className="image"
                        src={`${url}${photo.image}`}
                        alt={photo.title}
                        loading="lazy"
                      />
                      <div className="commands">
                        <input
                          className="input-title"
                          type="text"
                          placeholder="Altere o titulo"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                        <ChangeCircleIcon
                          className="change"
                          onClick={async () => {
                            await updatePhoto(photo._id);
                            handleClick({
                              vertical: "bottom",
                              horizontal: "right",
                            });
                          }}
                        />

                        <DeleteIcon
                          className="delete"
                          onClick={async () => await deletePhoto(photo._id)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            {topping === "Eventos" &&
              photoData.map((photo) => {
                return (
                  photo.event === "Eventos" && (
                    <div key={photo.image} className="box-photo">
                      <span className="subject-photos">
                        Evento: {photo.event}
                      </span>
                      <span className="subject-photos">
                        Titulo: {photo.title}
                      </span>
                      <img
                        className="image"
                        src={`${url}${photo.image}`}
                        alt={photo.title}
                        loading="lazy"
                      />
                      <div className="commands">
                        <input
                          className="input-title"
                          type="text"
                          placeholder="Altere o titulo"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                        <ChangeCircleIcon
                          className="change"
                          onClick={async () => {
                            await updatePhoto(photo._id);
                            handleClick({
                              vertical: "bottom",
                              horizontal: "right",
                            });
                          }}
                        />

                        <DeleteIcon
                          className="delete"
                          onClick={async () => await deletePhoto(photo._id)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Photos;
