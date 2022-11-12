import { makeFileOptions, makeOptionsWithoutBody } from 'api/apiUtils/makeOptions';
import { BASE_URL } from 'api/apiUtils/utils';

const createFile = async (
  files: FileList,
  fileName: string,
  taskId: string,
  token: string
): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}file`, makeFileOptions(files, fileName, taskId, token));
  if (response.status === 200) {
    return true;
  }
  return false;
};

const downLoadFile = async (token: string, fileName: string, taskId: string): Promise<boolean> => {
  const response = await fetch(
    `${BASE_URL}file/${taskId}/${fileName}`,
    makeOptionsWithoutBody(token)
  );
  if (response.status === 200) {
    return true;
  }
  return false;
};

export { createFile, downLoadFile };
