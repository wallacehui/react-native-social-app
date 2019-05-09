import {
  PaginationState,
  makeInitialPaginationState,
  makeDidFetchState,
  makeWillFetchState,
  makeWillRefreshFetchState,
  FetchState,
} from "./paginator";
import { Photo } from "../../models/photo";
import { Action } from "../actions";
import produce from "immer";
import { ReduxState } from "../store";

export interface State {
  photosPagination: PaginationState<Photo>;
}

const initialState: State = {
  photosPagination: makeInitialPaginationState(),
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, draft => {
    switch (action.type) {
      case "DidFetchPhotosAction": {
        const photos = action.payload.photosLink.items;
        const next = action.payload.photosLink.next;
        draft.photosPagination.ids = state.photosPagination.ids.concat(
          photos.map(photo => photo.id)
        );
        draft.photosPagination.fetchState = makeDidFetchState(next);
        for (const photo of photos) {
          draft.photosPagination.itemMap[photo.id] = photo;
        }
        break;
      }
      case "WillFetchPhotosAction": {
        draft.photosPagination.fetchState = makeWillFetchState(
          state.photosPagination.fetchState.next
        );
        break;
      }
      case "WillRefreshPhotosAction": {
        draft.photosPagination = makeInitialPaginationState();
        draft.photosPagination.fetchState = makeWillRefreshFetchState(
          undefined
        );
      }
    }
  });
}

export function selectPhotosFetchState(state: ReduxState): FetchState {
  return state.photo.photosPagination.fetchState;
}

export function selectPhotos(state: ReduxState): Photo[] {
  const photos: Photo[] = [];
  for (const id of state.photo.photosPagination.ids) {
    const photo = state.photo.photosPagination.itemMap[id];
    if (photo) {
      photos.push(photo);
    }
  }
  return photos;
}
