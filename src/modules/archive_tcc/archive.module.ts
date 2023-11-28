import { Module } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { IArchiveRepository } from './repositories/archive.repository';
import { ArchivePrismaRepository } from './repositories/prisma/archive.prisma.repository';
import { ArchiveController } from './controllers/archive.controller';
import { ArchiveService } from './services/archive.service';

@Module({
  imports: [],
  controllers: [ArchiveController],
  providers: [
    PrismaService,
    ArchiveService,
    {
      provide: IArchiveRepository,
      useClass: ArchivePrismaRepository,
    },
  ],
})
export class ArchiveModule {}
