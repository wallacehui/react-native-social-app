import { Action } from "../actions";
import produce from "immer";
import { ReduxState } from "../store";
import { Album } from "../../models/album";

export interface State {
  albumMap: { [id: number]: Album };
  albumIds: number[];
}

const initialState: State = {
  albumMap: {},
  albumIds: [],
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  return produce(state, draft => {
    switch (action.type) {
      case "DidFetchAlbumsAction": {
        const albums = action.payload.albums;
        draft.albumIds = albums.map(album => album.id);
        for (const album of albums) {
          draft.albumMap[album.id] = album;
        }
        break;
      }
      case "willFetchAlbumsAction": {
        draft = initialState;
        break;
      }
    }
  });
}

export function selectalbums(state: ReduxState): Album[] {
  const albums: Album[] = [];
  for (const id of state.album.albumIds) {
    const album = state.album.albumMap[id];
    if (album) {
      albums.push(album);
    }
  }
  return albums;
}
