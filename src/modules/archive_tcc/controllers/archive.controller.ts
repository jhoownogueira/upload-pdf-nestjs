import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArchiveService } from '../services/archive.service';
import { IArchiveSendDTO } from '../dtos/archive.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { existsSync } from 'fs';

@Controller('/tcc')
export class ArchiveController {
  constructor(private archiveService: ArchiveService) {}

  @Get('/archives')
  async getAllArchives() {
    return await this.archiveService.getAllArchives();
  }

  @Post('/archives')
  @UseInterceptors(FileInterceptor('file'))
  async createArchive(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Omit<IArchiveSendDTO, 'file'>,
  ) {
    data.arquivo = file;
    await this.archiveService.createArchive(data);
  }

  @Get('/download/:filename')
  async downloadArchive(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const filePath = process.env.URL_UPLOAD + '/' + filename;
    console.log(`Baixando arquivo em: ${filePath}`);
    if (!existsSync(filePath)) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    res.download(filePath);
  }

  @Get('/search/:name')
  async searchArchiveByNameAndAuthor(@Param('name') name: string) {
    return await this.archiveService.searchArchiveByNameAndAuthor(name);
  }
}
