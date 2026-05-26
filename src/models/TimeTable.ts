import BaseModel from './BaseModel';

export class TimeTable extends BaseModel {
  public classId: number;
  public roomId: number;
  public teacherId: number;
  public subjectId: number;
  public dayOfWeek: string;
  public startTime: string;
  public endTime: string;

  constructor(
    classId = 0,
    roomId = 0,
    teacherId = 0,
    subjectId = 0,
    dayOfWeek = '',
    startTime = '',
    endTime = '',
  ) {
    super();
    this.classId = classId;
    this.roomId = roomId;
    this.teacherId = teacherId;
    this.subjectId = subjectId;
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export default TimeTable;
