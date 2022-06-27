import crypto from "node:crypto";
import { ROLES } from "./types/roles";

interface UserProps {
  role: ROLES;
  score: number;
  firstName: string;
  lastName?: string | null;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class User {
  private _id: string;
  private props: UserProps;

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string | null {
    return this.props.lastName ?? null;
  }

  get score(): number {
    return this.props.score;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get role(): ROLES {
    return this.props.role;
  }

  constructor(props: UserProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}
