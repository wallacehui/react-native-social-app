import { User } from "./models/user";
import { userListResponseSchema } from "./models/api/user";

export type ApiClient = UserApiClient;

interface UserApiClient {
  queryUsers(): Promise<User[]>;
}

class ApiClientImpl implements ApiClient {
  async queryUsers(): Promise<User[]> {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const body = await response.json();
      return userListResponseSchema.validateSync(body);
    } catch (e) {
      throw e;
    }
  }
}

export default new ApiClientImpl();
