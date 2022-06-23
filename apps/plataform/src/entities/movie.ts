import crypto from 'node:crypto';

interface MovieProps {
  title: string;
  year: string;
  director: string;
}

export default class Movie {
  private _id: string;
  private props: MovieProps;

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  get year(): string {
    return this.props.year;
  }

  get director(): string {
    return this.props.director;
  }

  constructor(props: MovieProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}