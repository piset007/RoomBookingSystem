import BaseModel from './BaseModel';

export class ClassStudent extends BaseModel {
  public classId: number;
  public studentId: number;
  public enrolledAt?: Date;

  constructor(classId = 0, studentId = 0) {
    super();
    this.classId = classId;
    this.studentId = studentId;
  }
}

export default ClassStudent;
