/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useContext } from "react";
import PhotosContext from "../../contexts/PhotosContext";
import "./PhotosRender.css";

interface IPhotosRender {
  typeRender: string;
}

const PhotosRender: React.FC<IPhotosRender> = ({
  typeRender,
}: IPhotosRender) => {
  const { photoData, url } = useContext(PhotosContext);

  return (
    <>
      <div className="photos-container">
        <div className="spacing-header">
          <div className="wrapper-photos">
            <div className="first-row">
              {photoData.map(
                (file) =>
                  file.event === typeRender &&
                  file.title === "1" && (
                    <>
                      <img
                        src={`${url}${file.image}`}
                        className="first-photos"
                      />
                    </>
                  )
              )}
              <div className="wrap-two">
                {photoData.map(
                  (file) =>
                    file.event === typeRender &&
                    file.title === "2" && (
                      <>
                        <img
                          src={`${url}${file.image}`}
                          className="first-photos shortly"
                        />
                      </>
                    )
                )}
                {photoData.map(
                  (file) =>
                    file.event === typeRender &&
                    file.title === "3" && (
                      <>
                        <img
                          src={`${url}${file.image}`}
                          className="first-photos shortly"
                        />
                      </>
                    )
                )}
              </div>
              {photoData.map(
                (file) =>
                  file.event === typeRender &&
                  file.title === "4" && (
                    <>
                      <img
                        src={`${url}${file.image}`}
                        className="last-first-photo"
                      />
                    </>
                  )
              )}
            </div>
            <div className="second-row">
              {photoData.map(
                (file) =>
                  file.event === typeRender &&
                  file.title === "5" && (
                    <>
                      <img
                        src={`${url}${file.image}`}
                        className="second-photos longer"
                      />
                    </>
                  )
              )}
              {photoData.map(
                (file) =>
                  file.event === typeRender &&
                  file.title === "6" && (
                    <>
                      <img
                        src={`${url}${file.image}`}
                        className="second-photos"
                      />
                    </>
                  )
              )}
            </div>

            <div className="first-row reverse">
              {photoData.map(
                (file) =>
                  file.event === typeRender &&
                  file.title === "7" && (
                    <>
                      <img
                        src={`${url}${file.image}`}
                        className="first-photos"
                      />
                    </>
                  )
              )}

              <div className="wrap-two">
                {photoData.map(
                  (file) =>
                    file.event === typeRender &&
                    file.title === "8" && (
                      <>
                        <img
                          src={`${url}${file.image}`}
                          className="first-photos shortly"
                        />
                      </>
                    )
                )}
                {photoData.map(
                  (file) =>
                    file.event === typeRender &&
                    file.title === "9" && (
                      <>
                        <img
                          src={`${url}${file.image}`}
                          className="first-photos shortly"
                        />
                      </>
                    )
                )}
              </div>
              {photoData.map(
                (file) =>
                  file.event === typeRender &&
                  file.title === "10" && (
                    <>
                      <img
                        src={`${url}${file.image}`}
                        className="last-first-photo"
                      />
                    </>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotosRender;
