import * as yup from "yup";
import { Todo } from "../todo";

const todoSchema: yup.Schema<Todo> = yup.object<Todo>();

export const todoListResponseSchema: yup.ArraySchema<Todo> = yup
  .array()
  .of(todoSchema);
