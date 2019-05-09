import { User } from "../../models/user";
import { ThunkAction } from "../store";
import { Post } from "../../models/post";

export interface WillFetchPostsAction {
  type: "WillFetchPostsAction";
}

function willFetchPostsAction(): WillFetchPostsAction {
  return { type: "WillFetchPostsAction" };
}

export interface DidFetchPostsAction {
  type: "DidFetchPostsAction";
  payload: {
    posts: Post[];
  };
}

function didFetchPostsAction(posts: Post[]): DidFetchPostsAction {
  return {
    type: "DidFetchPostsAction",
    payload: {
      posts: posts,
    },
  };
}

export function fetchPostsByUser(user: User): ThunkAction<Promise<void>> {
  return async (dispatch, _, { apiClient }) => {
    dispatch(willFetchPostsAction());
    const posts = await apiClient.queryPostsByUser(user.id);
    dispatch(didFetchPostsAction(posts));
  };
}
