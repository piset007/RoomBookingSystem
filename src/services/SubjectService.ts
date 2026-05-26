import SubjectRepository from '../repositories/SubjectRepository';

export interface CreateSubjectInput {
  name: string;
  code: string;
  description?: string | null;
  gradeLevel?: string | null;
}

export interface UpdateSubjectInput {
  name?: string;
  code?: string;
  description?: string | null;
  gradeLevel?: string | null;
}

export class SubjectService {
  private subjects = new SubjectRepository();

  public getSubjects() {
    return this.subjects.findAll();
  }

  public getSubject(id: number) {
    return this.subjects.findById(id);
  }

  public createSubject(data: CreateSubjectInput) {
    return this.subjects.create(data);
  }

  public updateSubject(id: number, data: UpdateSubjectInput) {
    return this.subjects.update(id, data);
  }

  public deleteSubject(id: number) {
    return this.subjects.delete(id);
  }
}

export default SubjectService;
