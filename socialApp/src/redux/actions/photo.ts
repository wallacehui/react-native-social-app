import { ItemsLink } from "../reducers/paginator";
import { Photo } from "../../models/photo";
import { Album } from "../../models/album";
import { ThunkAction } from "../store";
import { selectPhotosFetchState } from "../reducers/photo";

export interface WillFetchPhotosAction {
  type: "WillFetchPhotosAction";
}

function willFetchPhotosAction(): WillFetchPhotosAction {
  return { type: "WillFetchPhotosAction" };
}

export interface WillRefreshPhotosAction {
  type: "WillRefreshPhotosAction";
}

function willRefreshPhotosAction(): WillRefreshPhotosAction {
  return { type: "WillRefreshPhotosAction" };
}

export interface DidFetchPhotosAction {
  type: "DidFetchPhotosAction";
  payload: {
    photosLink: ItemsLink<Photo>;
  };
}

function didFetchPhotosAction(
  photosLink: ItemsLink<Photo>
): DidFetchPhotosAction {
  return {
    type: "DidFetchPhotosAction",
    payload: {
      photosLink: photosLink,
    },
  };
}

export function refreshPhotosByAlbum(album: Album): ThunkAction<Promise<void>> {
  return async (dispatch, _, { apiClient }) => {
    dispatch(willRefreshPhotosAction());
    const photosLink = await apiClient.queryPhotosByAlbum(album.id, undefined);
    dispatch(didFetchPhotosAction(photosLink));
  };
}

export function fetchPhotosByAlbum(album: Album): ThunkAction<Promise<void>> {
  return async (dispatch, getState, { apiClient }) => {
    dispatch(willFetchPhotosAction());
    const fetchState = selectPhotosFetchState(getState());
    const photosLink = await apiClient.queryPhotosByAlbum(
      album.id,
      fetchState.next
    );
    dispatch(didFetchPhotosAction(photosLink));
  };
}
