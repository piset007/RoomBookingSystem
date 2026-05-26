import BaseModel from './BaseModel';

export class Subject extends BaseModel {
  public name: string;
  public code: string;
  public description: string | null;
  public gradeLevel: string | null;

  constructor(name = '', code = '', description: string | null = null, gradeLevel: string | null = null) {
    super();
    this.name = name;
    this.code = code;
    this.description = description;
    this.gradeLevel = gradeLevel;
  }
}

export default Subject;
