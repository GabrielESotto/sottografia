/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-unknown-property */
import "./UploadBox.css";
import { useDropzone } from "react-dropzone";

interface IUploadBox {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpload: any;
}

const UploadBox: React.FC<IUploadBox> = ({ onUpload }: IUploadBox) => {
  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return <p className="upload-message">Arraste arquivos aqui ...</p>;
    }

    if (isDragReject) {
      return <p className="upload-message error">Arquivo não suportado</p>;
    }

    return <p className="upload-message success">Solte os arquivos aqui</p>;
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
      },
      onDropAccepted: onUpload,
    });

  return (
    <>
      <div
        className={
          isDragActive
            ? "drop-container dragActive"
            : "drop-container dragReject"
        }
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {renderDragMessage(isDragActive, isDragReject)}
      </div>
    </>
  );
};

export default UploadBox;
