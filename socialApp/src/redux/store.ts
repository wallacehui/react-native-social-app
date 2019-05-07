import {
  createStore,
  applyMiddleware,
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  Action,
} from "redux";
import thunk, {
  ThunkAction as _ThunkAction,
  ThunkDispatch as _ThunkDispatch,
} from "redux-thunk";
import apiClient, { ApiClient } from "../apiClient";
import reducers, { State } from "./reducers";

interface Services {
  apiClient: ApiClient;
}

export type ThunkAction<R> = _ThunkAction<R, State, Services, Action>;
type ThunkDispatch = _ThunkDispatch<State, Services, Action>;
export type Dispatch = ReduxDispatch & ThunkDispatch;

export type ReduxState = State;

interface Store<S> extends ReduxStore<S> {
  dispatch: Dispatch;
}

function makeStoreWithServices(services: Services) {
  const middlewares = [thunk.withExtraArgument(services)];
  return createStore(reducers, applyMiddleware(...middlewares));
}

export function makeStore(): Store<State> {
  return makeStoreWithServices({
    apiClient,
  });
}
