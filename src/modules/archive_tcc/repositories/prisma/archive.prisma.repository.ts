import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IArchiveRepository } from '../archive.repository';
import { IArchiveSendDTO } from '../../dtos/archive.dto';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ArchivePrismaRepository implements IArchiveRepository {
  constructor(private prisma: PrismaService) {}

  async getAllArchives(): Promise<any> {
    return await this.prisma.tcc_arquivo.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async createArchive(data: IArchiveSendDTO): Promise<void> {
    await this.saveArchivePatch(data);
    await this.prisma.tcc_arquivo.create({
      data: {
        nome_arquivo: data.nome_arquivo,
        autor_arquivo: data.autor_arquivo,
        url_arquivo: data.arquivo.originalname,
      },
    });
  }

  async saveArchivePatch(data: IArchiveSendDTO): Promise<void> {
    try {
      const uploadPath = process.env.URL_UPLOAD;
      mkdirSync(uploadPath, { recursive: true });

      const filePath = join(uploadPath, data.arquivo.originalname);
      console.log(`Salvando arquivo em: ${filePath}`);
      writeFileSync(filePath, data.arquivo.buffer);
    } catch (error) {
      console.error('Erro ao salvar o arquivo:', error);
      throw error;
    }
  }

  async searchArchiveByNameAndAuthor(name: string): Promise<any> {
    return await this.prisma.tcc_arquivo.findMany({
      where: {
        OR: [
          {
            nome_arquivo: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            autor_arquivo: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
