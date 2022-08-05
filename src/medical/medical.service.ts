import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as reader from 'xlsx';

@Injectable()
export class MedicalService {
  async getMedicalData(): Promise<object> {
    const file = reader.readFile(
      path.join(__dirname, '../../medicaldata.xlsx'),
    );
    const medicalData = {};
    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const sheetName = file.SheetNames[i];
      const temp = reader.utils.sheet_to_json(file.Sheets[sheetName]);
      medicalData[sheetName] = JSON.parse(JSON.stringify(temp));
    }
    return medicalData;
  }
}
