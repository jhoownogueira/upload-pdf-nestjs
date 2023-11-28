import { Module } from '@nestjs/common';
import { ArchiveModule } from './modules/archive_tcc/archive.module';

@Module({
  imports: [ArchiveModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
