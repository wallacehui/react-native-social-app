import { Action } from "../actions";
import produce from "immer";
import { ReduxState } from "../store";
import { Post } from "../../models/post";

export interface State {
  postMap: { [id: number]: Post };
  postIds: number[];
}

const initialState: State = {
  postMap: {},
  postIds: [],
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, draft => {
    switch (action.type) {
      case "DidFetchPostsAction": {
        const posts = action.payload.posts;
        draft.postIds = posts.map(post => post.id);
        for (const post of posts) {
          draft.postMap[post.id] = post;
        }
        break;
      }
      case "WillFetchPostsAction": {
        draft.postIds = [];
        break;
      }
    }
  });
}

export function selectPosts(state: ReduxState): Post[] {
  const posts: Post[] = [];
  for (const id of state.post.postIds) {
    const post = state.post.postMap[id];
    if (post) {
      posts.push(post);
    }
  }
  return posts;
}
