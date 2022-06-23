interface CommentProps {
    id?: number
    userId: string
    movieId: string
    text: string
    citationId: number | null
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

  get citationId(): number | null {
    return this.props.citationId;
  }

  constructor(props: CommentProps) {
    this.props = props;
  }
}