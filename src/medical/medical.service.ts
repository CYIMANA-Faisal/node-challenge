import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as path from 'path';
import * as reader from 'xlsx';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MedicalService {
  constructor(
    private configService: ConfigService,
  ){}

  async getMedicalData(token: string): Promise<any> {
    try {
      const valid = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      if(valid){
        const file = reader.readFile(
          path.join(__dirname, '../../medicaldata.xlsx'),
        );
        const medicalData = {
        };
        const sheets = file.SheetNames;
        for (let i = 0; i < sheets.length; i++) {
          const sheetName = file.SheetNames[i];
          const temp = reader.utils.sheet_to_json(file.Sheets[sheetName]);
          medicalData[sheetName] = JSON.parse(JSON.stringify(temp));
        }
        return medicalData;
      }
    } catch (error) {
      throw new UnauthorizedException("Invalid token please provide the valid one")
    }
  }
}
