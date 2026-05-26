import TimeTableRepository from '../repositories/TimeTableRepository';

export interface CreateTimeTableInput {
  classId: number;
  roomId: number;
  teacherId: number;
  subjectId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface UpdateTimeTableInput {
  classId?: number;
  roomId?: number;
  teacherId?: number;
  subjectId?: number;
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
}

export class TimeTableService {
  private timetables = new TimeTableRepository();

  public getTimeTables() {
    return this.timetables.findAll();
  }

  public getTimeTable(id: number) {
    return this.timetables.findById(id);
  }

  public getTimeTablesByRoom(roomId: number) {
    return this.timetables.findByRoom(roomId);
  }

  public createTimeTable(data: CreateTimeTableInput) {
    return this.timetables.create(data);
  }

  public updateTimeTable(id: number, data: UpdateTimeTableInput) {
    return this.timetables.update(id, data);
  }

  public deleteTimeTable(id: number) {
    return this.timetables.delete(id);
  }
}

export default TimeTableService;
