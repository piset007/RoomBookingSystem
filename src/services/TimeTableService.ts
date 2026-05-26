import TimeTableRepository from '../repositories/TimeTableRepository';

export interface CreateTimeTableInput {
  roomId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  subject?: string | null;
}

export interface UpdateTimeTableInput {
  roomId?: number;
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
  subject?: string | null;
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
