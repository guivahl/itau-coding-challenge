import crypto from 'node:crypto';

interface MovieProps {
  imdbID: string;
}

export default class Movie {
  private _id: string;
  private props: MovieProps;

  get id(): string {
    return this._id;
  }

  get imdbID(): string {
    return this.props.imdbID;
  }

  constructor(props: MovieProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}