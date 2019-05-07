import { Action } from "../actions";
import { ReduxState } from "../store";
import { User } from "../../models/user";
import produce from "immer";

export interface State {
  userMap: { [id: number]: User };
}

const initialState: State = {
  userMap: {},
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, draft => {
    switch (action.type) {
      case "DidFetchUserListAction": {
        for (const user of action.payload.users) {
          draft.userMap[user.id] = user;
        }
        break;
      }
    }
  });
}
