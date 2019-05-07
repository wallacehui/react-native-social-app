import * as yup from "yup";
import { User } from "../user";

const userSchema: yup.Schema<User> = yup.object<User>();

export const userListResponseSchema: yup.ArraySchema<User> = yup
  .array()
  .of(userSchema);
