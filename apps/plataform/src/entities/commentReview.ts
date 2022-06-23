interface commentReviewProps {
    id?: number
    userId: string
    commentId: number
    hasLiked: boolean
    createdAt?: Date
}

export default class commentReview {
  private props: commentReviewProps;

  get userId(): string {
    return this.props.userId;
  }

  get commentId(): number {
    return this.props.commentId;
  }

  get hasLiked(): boolean {
    return this.props.hasLiked;
  }

  constructor(props: commentReviewProps) {
    this.props = props;
  }
}