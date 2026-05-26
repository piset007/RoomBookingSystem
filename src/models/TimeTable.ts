import BaseModel from './BaseModel';

export class TimeTable extends BaseModel {
  public roomId: number;
  public dayOfWeek: string;
  public startTime: string;
  public endTime: string;
  public subject: string | null;

  constructor(roomId = 0, dayOfWeek = '', startTime = '', endTime = '', subject: string | null = null) {
    super();
    this.roomId = roomId;
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
    this.subject = subject;
  }
}

export default TimeTable;
