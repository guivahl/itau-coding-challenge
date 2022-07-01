export interface CommentProps {
    id?: number
    userId: string
    movieId: string
    text: string
    citationId: number | null
    replyId: number | null
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

  get replyId(): number | null {
    return this.props.replyId;
  }

  get commentProps(): CommentProps {
    return this.props;
  }

  constructor(props: CommentProps) {
    this.props = props;
  }
}