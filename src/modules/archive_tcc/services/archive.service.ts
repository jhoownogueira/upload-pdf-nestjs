import { Injectable } from '@nestjs/common';
import { IArchiveRepository } from '../repositories/archive.repository';
import { IArchiveSendDTO } from '../dtos/archive.dto';

@Injectable()
export class ArchiveService {
  constructor(private archiveRepository: IArchiveRepository) {}

  async getAllArchives(): Promise<any> {
    return await this.archiveRepository.getAllArchives();
  }

  async createArchive(data: IArchiveSendDTO): Promise<void> {
    await this.archiveRepository.createArchive(data);
  }

  async searchArchiveByNameAndAuthor(name: string): Promise<any> {
    return await this.archiveRepository.searchArchiveByNameAndAuthor(name);
  }
}
