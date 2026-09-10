export interface ApartmentMemberProps {
  id: string;
  userId: string;
  apartmentId: string;
  createdAt: Date;
}

export class ApartmentMember {
  private readonly props: ApartmentMemberProps;
  
  constructor(props: ApartmentMemberProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get apartmentId(): string {
    return this.props.apartmentId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}