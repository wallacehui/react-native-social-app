import { User } from "./models/user";
import { userListResponseSchema } from "./models/api/user";
import { Todo } from "./models/todo";
import { todoListResponseSchema } from "./models/api/todo";
import { appendQueryString } from "./utils/urlUtil";

const endpoint = "https://jsonplaceholder.typicode.com";

export type ApiClient = UserApiClient & TodoApiClient;

interface UserApiClient {
  queryUsers(): Promise<User[]>;
}

interface TodoApiClient {
  queryTodosByUser(userId: number): Promise<Todo[]>;
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
}

export default new ApiClientImpl();
