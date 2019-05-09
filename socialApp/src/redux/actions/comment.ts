import { ThunkAction } from "../store";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";

export interface WillFetchCommentsAction {
  type: "WillFetchCommentsAction";
}

function willFetchCommentsAction(): WillFetchCommentsAction {
  return { type: "WillFetchCommentsAction" };
}

export interface DidFetchCommentsAction {
  type: "DidFetchCommentsAction";
  payload: {
    comments: Comment[];
  };
}

function didFetchCommentsAction(comments: Comment[]): DidFetchCommentsAction {
  return {
    type: "DidFetchCommentsAction",
    payload: {
      comments: comments,
    },
  };
}

export function fetchCommentsByPost(post: Post): ThunkAction<Promise<void>> {
  return async (dispatch, _, { apiClient }) => {
    dispatch(willFetchCommentsAction());
    const comments = await apiClient.queryCommentByPost(post.id);
    dispatch(didFetchCommentsAction(comments));
  };
}
