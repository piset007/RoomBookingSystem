# Room Booking System Diagrams

This document is based on the current model layer under [src/models](../src/models).

## 1) ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    USER ||--o{ BOOKING : makes
    ROOM ||--o{ BOOKING : is_used_in
    SUBJECT ||--o{ BOOKING : belongs_to
    USER ||--o{ TIMETABLE : teaches
    ROOM ||--o{ TIMETABLE : hosts
    SUBJECT ||--o{ TIMETABLE : taught_as
    CLASS ||--o{ TIMETABLE : has
    CLASS ||--o{ CLASS_STUDENT : contains
    USER ||--o{ CLASS_STUDENT : enrolls
    ROOM ||--o{ ROOM_ACCESS_RULE : has
    ROLE ||--o{ ROLE_PERMISSION : grants
    PERMISSION ||--o{ ROLE_PERMISSION : is_assigned_to

    USER {
      int id
      string fullName
      string email
      string password
      enum role
      string department
      bool isActive
    }

    BOOKING {
      int id
      int userId
      int roomId
      datetime startTime
      datetime endTime
      string purpose
      int subjectId
      enum status
      int approvedBy
      datetime approvedAt
    }

    ROOM {
      int id
      string name
      int capacity
      string location
      enum status
      enum accessPolicy
    }

    SUBJECT {
      int id
      string name
      string code
      string description
      string gradeLevel
    }

    CLASS {
      int id
      string name
      string gradeLevel
      int teacherId
      string academicYear
    }

    TIMETABLE {
      int id
      int classId
      int roomId
      int teacherId
      int subjectId
      string dayOfWeek
      string startTime
      string endTime
    }

    CLASS_STUDENT {
      int id
      int classId
      int studentId
      datetime enrolledAt
    }

    ROOM_ACCESS_RULE {
      int id
      int roomId
      enum allowedRole
      bool requiresApproval
      int approverId
    }

    ROLE {
      enum name
    }

    PERMISSION {
      int id
      string action
      string description
    }

    ROLE_PERMISSION {
      int id
      enum role
      int permissionId
    }
```

## 2) UML Class Diagram

```mermaid
classDiagram
    class BaseModel {
      +id: number
      +createdAt: Date
      +updatedAt: Date
    }

    class User {
      +fullName: string
      +email: string
      +password: string
      +role: Role
      +department: string|null
      +isActive: boolean
      +verifyPassword(password)
      +hasPermission(action)
      +toJSON()
    }

    class AdminUser
    class TeacherUser
    class StudentUser

    class Room {
      +name: string
      +capacity: number
      +location: string
      +status: RoomStatus
      +accessPolicy: RoomAccessPolicy
    }

    class Booking {
      +userId: number
      +roomId: number
      +startTime: Date
      +endTime: Date
      +purpose: string|null
      +subjectId: number|null
      +status: BookingStatus
      +approvedBy: number|null
      +approvedAt: Date|null
    }

    class Subject {
      +name: string
      +code: string
      +description: string|null
      +gradeLevel: string|null
    }

    class Class {
      +name: string
      +gradeLevel: string|null
      +teacherId: number
      +academicYear: string
    }

    class TimeTable {
      +classId: number
      +roomId: number
      +teacherId: number
      +subjectId: number
      +dayOfWeek: string
      +startTime: string
      +endTime: string
    }

    class ClassStudent {
      +classId: number
      +studentId: number
      +enrolledAt: Date
    }

    class Permission {
      +action: string
      +description: string|null
    }

    class RolePermission {
      +role: Role
      +permissionId: number
    }

    class RoomAccessRule {
      +roomId: number
      +allowedRole: Role
      +requiresApproval: boolean
      +approverId: number|null
    }

    BaseModel <|-- User
    BaseModel <|-- Room
    BaseModel <|-- Booking
    BaseModel <|-- Subject
    BaseModel <|-- Class
    BaseModel <|-- TimeTable
    BaseModel <|-- ClassStudent
    BaseModel <|-- Permission
    BaseModel <|-- RolePermission
    BaseModel <|-- RoomAccessRule

    User <|-- AdminUser
    User <|-- TeacherUser
    User <|-- StudentUser

    User "1" --> "0..*" Booking : makes
    Room "1" --> "0..*" Booking : used by
    Subject "1" --> "0..*" Booking : linked to

    User "1" --> "0..*" TimeTable : teaches
    Room "1" --> "0..*" TimeTable : hosts
    Subject "1" --> "0..*" TimeTable : covers
    Class "1" --> "0..*" TimeTable : contains

    Class "1" --> "0..*" ClassStudent : includes
    User "1" --> "0..*" ClassStudent : enrolls as student

    Room "1" --> "0..*" RoomAccessRule : restricts
    RolePermission "0..*" --> "1" Permission : references
```
```
