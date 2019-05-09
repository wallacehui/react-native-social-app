import { User } from "./models/user";
import { userListResponseSchema } from "./models/api/user";
import { Todo } from "./models/todo";
import { todoListResponseSchema } from "./models/api/todo";
import { appendQueryString, parseLinkHeader } from "./utils/urlUtil";
import { Album } from "./models/album";
import { albumListResponseSchema } from "./models/api/album";
import { ItemsLink } from "./redux/reducers/paginator";
import { Photo } from "./models/photo";
import { photoListResponseSchema } from "./models/api/photo";

const endpoint = "https://jsonplaceholder.typicode.com";
const size = 20;

export type ApiClient = UserApiClient &
  TodoApiClient &
  AlbumApiClient &
  PhotoApiClient;

interface UserApiClient {
  queryUsers(): Promise<User[]>;
}

interface TodoApiClient {
  queryTodosByUser(userId: number): Promise<Todo[]>;
}

interface AlbumApiClient {
  queryAlbumsByUser(userId: number): Promise<Album[]>;
}

interface PhotoApiClient {
  queryPhotosByAlbum(
    albumId: number,
    nextLink: string | undefined
  ): Promise<ItemsLink<Photo>>;
}

class ApiClientImpl implements ApiClient {
  async queryUsers(): Promise<User[]> {
    try {
      const response = await fetch(endpoint + "/users");
      const body = await response.json();
      return userListResponseSchema.validateSync(body);
    } catch (e) {
      throw e;
    }
  }

  async queryTodosByUser(userId: number): Promise<Todo[]> {
    try {
      const url = appendQueryString(endpoint + "/todos", {
        userId: userId.toString(),
      });
      const response = await fetch(url);
      const body = await response.json();
      return todoListResponseSchema.validateSync(body);
    } catch (e) {
      throw e;
    }
  }

  async queryAlbumsByUser(userId: number): Promise<Album[]> {
    try {
      const url = appendQueryString(endpoint + "/albums", {
        userId: userId.toString(),
      });
      const response = await fetch(url);
      const body = await response.json();
      return albumListResponseSchema.validateSync(body);
    } catch (e) {
      throw e;
    }
  }

  async queryPhotosByAlbum(
    albumId: number,
    nextLink: string | undefined
  ): Promise<ItemsLink<Photo>> {
    try {
      var url: string;
      if (nextLink == null) {
        url = appendQueryString(endpoint + "/photos", {
          albumId: albumId.toString(),
          _page: "1",
          _limit: size.toString(),
        });
      } else {
        url = nextLink;
      }
      const response = await fetch(url);
      const body = await response.json();
      const headers = response.headers;
      const link = parseLinkHeader(headers.get("Link"));
      const photos = photoListResponseSchema.validateSync(body);
      return { items: photos, next: link.next };
    } catch (e) {
      throw e;
    }
  }
}

export default new ApiClientImpl();
