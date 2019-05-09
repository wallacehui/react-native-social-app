export type PaingationStatus = "WillFetch" & "WillRefresh" & "DidFetch";

export interface PaginationState<T> {
  ids: number[];
  itemMap: { [id: number]: T };
  fetchState: {
    status: PaingationStatus;
    next: string | undefined;
  };
}

export interface ItemsLink<T> {
  items: T[];
  next: string | undefined;
}
