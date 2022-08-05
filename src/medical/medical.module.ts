import { Module } from '@nestjs/common';
import { MedicalService } from './medical.service';
import { MedicalController } from './medical.controller';

@Module({
  controllers: [MedicalController],
  providers: [MedicalService]
})
export class MedicalModule {}
