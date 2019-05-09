import { Action } from "../actions";
import produce from "immer";
import { ReduxState } from "../store";
import { Comment } from "../../models/comment";

export interface State {
  commentMap: { [id: number]: Comment };
  commentIds: number[];
}

const initialState: State = {
  commentMap: {},
  commentIds: [],
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, draft => {
    switch (action.type) {
      case "DidFetchCommentsAction": {
        const comments = action.payload.comments;
        draft.commentIds = comments.map(comment => comment.id);
        for (const comment of comments) {
          draft.commentMap[comment.id] = comment;
        }
        break;
      }
      case "WillFetchCommentsAction": {
        draft = initialState;
        break;
      }
    }
  });
}

export function selectComments(state: ReduxState): Comment[] {
  const comments: Comment[] = [];
  for (const id of state.comment.commentIds) {
    const comment = state.comment.commentMap[id];
    if (comment) {
      comments.push(comment);
    }
  }
  return comments;
}
