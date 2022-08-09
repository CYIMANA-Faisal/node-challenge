import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as path from 'path';
import * as reader from 'xlsx';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Role } from './enums/role.enum';

@Injectable()
export class MedicalService {
  constructor(private configService: ConfigService) {}

  async getMedicalData(token: string): Promise<any> {
    const file = reader.readFile(
      path.join(__dirname, '../../medicaldata.xlsx'),
    );
    const decoded = jwt.decode(token);
    if (decoded) {
      const medicalData = {};
      const sheets = file.SheetNames;
      for (let i = 0; i < sheets.length; i++) {
        const sheetName = file.SheetNames[i];
        const key = sheetName
          .toString()
          .split(' ')
          .join('')
          .split('-')
          .join('');
        medicalData[key] = reader.utils.sheet_to_json(file.Sheets[sheetName]);
      }
      const role = decoded['role'];
      switch (role) {
        case 'ADMIN':
          return medicalData;
        case 'PATIENT':
          return medicalData['Patientillnesses20002002'];
        case 'PHYSICIAN':
          return medicalData['Physiciansmissions20002002'];
        case 'PHARMACIST':
          return medicalData['Mostboughdrugs20002002'];
        default:
          return [];
      }
    } else {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
