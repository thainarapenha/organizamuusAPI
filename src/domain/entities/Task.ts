export type TaskRoom =
  | "living_room"
  | "kitchen"
  | "bedroom"
  | "bathroom";

export type TaskRecurrence =
  | "single"
  | "weekly";

export type TaskStatus =
  | "pending"
  | "completed";

interface TaskProps {
  id: string;
  apartmentId: string;
  responsibleMemberId: string;
  createdByMemberId: string;

  room: TaskRoom;
  description: string;

  startDate: Date;
  endDate: Date;

  recurrence: TaskRecurrence;
  status: TaskStatus;

  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private readonly props: TaskProps;

  constructor(props: TaskProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get apartmentId(): string {
    return this.props.apartmentId;
  }

  get responsibleMemberId(): string {
    return this.props.responsibleMemberId;
  }

  get createdByMemberId(): string {
    return this.props.createdByMemberId;
  }

  get room(): TaskRoom {
    return this.props.room;
  }

  get description(): string {
    return this.props.description;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date {
    return this.props.endDate;
  }

  get recurrence(): TaskRecurrence {
    return this.props.recurrence;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}