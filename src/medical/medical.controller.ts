import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { GenericResponse } from '../common/interfaces/generic-response.interface';
import { MedicalService } from './medical.service';

@Controller('medical')
export class MedicalController {
  constructor(private readonly medicalService: MedicalService) {}

  @Get()
  async getMedicalData(@Query('token') token: string): Promise<GenericResponse<any>> {
    if(token === undefined){
      throw new UnauthorizedException("Please login to access this resource")
    }
    const results = await this.medicalService.getMedicalData(token);
    return { message: 'Medical Data loaded successfully', payload: results };
  }
}
