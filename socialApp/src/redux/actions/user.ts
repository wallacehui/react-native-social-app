import { User } from "../../models/user";
import { ThunkAction } from "../store";

export interface DidFetchUsersAction {
  type: "DidFetchUserListAction";
  payload: {
    users: User[];
  };
}

function didFetchUserListAction(users: User[]): DidFetchUsersAction {
  return {
    type: "DidFetchUserListAction",
    payload: {
      users,
    },
  };
}

export function fetchUsers(): ThunkAction<Promise<void>> {
  return async (dispatch, _, { apiClient }) => {
    const users = await apiClient.queryUsers();
    dispatch(didFetchUserListAction(users));
  };
}
