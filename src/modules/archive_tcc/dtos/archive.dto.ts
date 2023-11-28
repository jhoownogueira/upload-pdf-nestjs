export interface IArchiveSendDTO {
  nome_arquivo: string;
  autor_arquivo: string;
  arquivo: Express.Multer.File;
}
