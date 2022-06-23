interface RatingProps {
    id?: number
    userId: string
    movieId: string
    score: string
    createdAt?: Date
}

export default class Rating {
  private props: RatingProps;

  get userId(): string {
    return this.props.userId;
  }

  get movieId(): string {
    return this.props.movieId;
  }

  get score(): string {
    return this.props.score;
  }

  constructor(props: RatingProps) {
    this.props = props;
  }
}