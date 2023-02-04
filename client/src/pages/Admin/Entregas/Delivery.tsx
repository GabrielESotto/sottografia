/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "./Delivery.css";
import { useState, useEffect } from "react";
import { uniqueId } from "lodash";
import { filesize } from "filesize";
import HeaderAdmin from "../../../components/HeaderAdmin/HeaderAdmin";
import UploadBox from "../../../components/Upload/UploadBox";
import FileList from "../../../components/FileList/FileList";
import api from "../../../services/api";
import axios, { AxiosProgressEvent } from "axios";

export interface Files {
  path: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  arrayBuffer: any;
  slice: any;
  stream: any;
  text: any;
}

export interface IUploadedFiles {
  file: Files;
  id: string;
  name: string;
  readableSize:
    | string
    | number
    | any[]
    | {
        value: any;
        symbol: any;
        exponent: number;
        unit: string;
      };
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string | null;
}

export interface IFilesFromAPI {
  name: string;
  _id: string;
  size: number;
  readableSize: any;
  preview: string;
  uploaded: boolean;
  url: string;
}

const Delivery: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFiles[]>([]);

  const handleUpload = (files: Files[]) => {
    const uploadedFile = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles(uploadedFiles.concat(uploadedFile));

    uploadedFile.forEach(processUpload);
  };

  const processUpload = async (uploadedFile: IUploadedFiles) => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    await api
      .post<IUploadedFiles>("/newfile", data, {
        onUploadProgress: (e: AxiosProgressEvent) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const progress = Math.round((e.loaded * 100) / e.total!);

          updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((res) => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: res.data.id,
          url: res.data.url,
        });
      })
      .catch((error) => {
        console.log(error);
        updateFile(uploadedFile.id, {
          error: true,
        });
      });

    await fetchData();
  };

  const updateFile = (id: string, data: any) => {
    setUploadedFiles(
      uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    );
  };

  const fetchData = async () => {
    await api
      .get("/allfiles")
      .then((res) => {
        setUploadedFiles(
          res.data.posts.map((file: IFilesFromAPI) => ({
            id: file._id,
            name: file.name,
            readableSize: filesize(file.size),
            preview: file.url,
            uploaded: true,
            url: file.url,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/deletefile/${id}`);

    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  useEffect(() => {
    uploadedFiles.forEach((file) => {
      URL.revokeObjectURL(file.preview);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleLink = () => {
    axios
      .get("http://localhost:3001/posts/ziplink")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownload = () => {
    axios
      .get("http://localhost:3001/posts/download")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <HeaderAdmin />
        <div className="container-delivery">
          <h1 className="title-delivery">Entrega dos Ensaios</h1>
          <>
            <div className="wrapper-delivery">
              <UploadBox onUpload={handleUpload} />
              {!!uploadedFiles.length && (
                <FileList files={uploadedFiles} onDelete={handleDelete} />
              )}
              <p className="select-photos">
                Fotos selecionadas: {uploadedFiles.length}
              </p>
              <button onClick={handleLink}>Gerar Link</button>
              <button onClick={handleDownload}>Download</button>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Delivery;
