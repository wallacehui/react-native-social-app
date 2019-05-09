export type PaingationStatus = "WillFetch" | "WillRefresh" | "Idle";

export interface PaginationState<T> {
  ids: number[];
  itemMap: { [id: number]: T };
  fetchState: FetchState;
}

export interface FetchState {
  status: PaingationStatus;
  next: string | undefined;
}

export interface ItemsLink<T> {
  items: T[];
  next: string | undefined;
}

export function makeInitialPaginationState<T>(): PaginationState<T> {
  return {
    ids: [],
    itemMap: {},
    fetchState: {
      status: "Idle",
      next: undefined,
    },
  };
}

export function makeDidFetchState(next: string | undefined): FetchState {
  return {
    status: "Idle",
    next: next,
  };
}

export function makeWillFetchState(next: string | undefined): FetchState {
  return {
    status: "WillFetch",
    next: next,
  };
}

export function makeWillRefreshFetchState(
  next: string | undefined
): FetchState {
  return {
    status: "WillRefresh",
    next: next,
  };
}
