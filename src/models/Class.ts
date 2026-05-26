import BaseModel from './BaseModel';

export class Class extends BaseModel {
  public name: string;
  public gradeLevel: string | null;
  public teacherId: number;
  public academicYear: string;

  constructor(name = '', gradeLevel: string | null = null, teacherId = 0, academicYear = '') {
    super();
    this.name = name;
    this.gradeLevel = gradeLevel;
    this.teacherId = teacherId;
    this.academicYear = academicYear;
  }
}

export default Class;
