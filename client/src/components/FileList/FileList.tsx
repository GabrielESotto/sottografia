/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import "./FileList.css";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { IUploadedFiles } from "../../pages/Admin/Entregas/Delivery";

interface IFiles {
  files: IUploadedFiles[];
  onDelete: (id: string) => Promise<void>;
}

const FileList: React.FC<IFiles> = ({ files, onDelete }: IFiles) => {
  return (
    <>
      <div className="container-files">
        {files.map((uploadedFile) => (
          <li key={uploadedFile.id} className="li-files">
            <div className="file-info">
              <img src={uploadedFile.preview} className="preview" />
              <div>
                <strong>{uploadedFile.name}</strong>
                <span>
                  <>
                    {uploadedFile.readableSize}{" "}
                    <button
                      onClick={() => {
                        void onDelete(uploadedFile.id);
                      }}
                    >
                      Excluir
                    </button>
                  </>
                </span>
              </div>
            </div>
            <div>
              {!uploadedFile.uploaded && !uploadedFile.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: "#7159c1" },
                  }}
                  strokeWidth={10}
                  value={uploadedFile.progress}
                />
              )}
              {uploadedFile.url && (
                <a
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>
              )}

              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        ))}
      </div>
    </>
  );
};

export default FileList;
