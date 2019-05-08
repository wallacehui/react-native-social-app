import { User } from "../../models/user";
import { ThunkAction } from "../store";
import { Album } from "../../models/album";

export interface WillFetchAlbumsAction {
  type: "willFetchAlbumsAction";
}

function willFetchAlbumsAction(): WillFetchAlbumsAction {
  return { type: "willFetchAlbumsAction" };
}

export interface DidFetchAlbumsAction {
  type: "DidFetchAlbumsAction";
  payload: {
    albums: Album[];
  };
}

function didFetchAlbumsAction(albums: Album[]): DidFetchAlbumsAction {
  return {
    type: "DidFetchAlbumsAction",
    payload: {
      albums: albums,
    },
  };
}

export function fetchalbumsByUser(user: User): ThunkAction<Promise<void>> {
  return async (dispatch, _, { apiClient }) => {
    dispatch(willFetchAlbumsAction());
    const albums = await apiClient.queryAlbumsByUser(user.id);
    dispatch(didFetchAlbumsAction(albums));
  };
}
