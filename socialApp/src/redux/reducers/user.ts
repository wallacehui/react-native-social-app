import { Action } from "../actions";
import { ReduxState } from "../store";
import { User } from "../../models/user";
import produce from "immer";

export interface State {
  userMap: { [id: number]: User };
  userIds: number[];
}

const initialState: State = {
  userMap: {},
  userIds: [],
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, draft => {
    switch (action.type) {
      case "DidFetchUserListAction": {
        const users = action.payload.users;
        draft.userIds = users.map(user => user.id);
        for (const user of users) {
          draft.userMap[user.id] = user;
        }
        break;
      }
    }
  });
}

export function selectUsers(state: ReduxState): User[] {
  const users: User[] = [];
  for (const id of state.user.userIds) {
    const user = state.user.userMap[id];
    if (user) {
      users.push(user);
    }
  }
  return users;
}
