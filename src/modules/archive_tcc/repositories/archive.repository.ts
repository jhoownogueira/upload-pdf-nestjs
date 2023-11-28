import { IArchiveSendDTO } from '../dtos/archive.dto';

export abstract class IArchiveRepository {
  abstract getAllArchives(): Promise<any>;
  abstract createArchive(data: IArchiveSendDTO): Promise<void>;
  abstract searchArchiveByNameAndAuthor(name: string): Promise<any>;
}
