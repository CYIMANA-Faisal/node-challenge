import { Controller, Get } from '@nestjs/common';
import { GenericResponse } from '../common/interfaces/generic-response.interface';
import { MedicalService } from './medical.service';

@Controller('medical')
export class MedicalController {
  constructor(private readonly medicalService: MedicalService) {}

  @Get()
  async getMedicalData(): Promise<GenericResponse<any>> {
    const results = await this.medicalService.getMedicalData();
    return { message: 'Medical Data loaded successfully', payload: results };
  }
}
