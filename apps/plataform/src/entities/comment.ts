interface CommentProps {
    id?: number
    userId: string
    movieId: string
    text: string
    isRepeated?: boolean
    createdAt?: Date
}

export default class Comment {
  private props: CommentProps;

  get userId(): string {
    return this.props.userId;
  }

  get movieId(): string {
    return this.props.movieId;
  }

  get text(): string {
    return this.props.text;
  }

  constructor(props: CommentProps, id?: number) {
    this.props = props;
  }
}