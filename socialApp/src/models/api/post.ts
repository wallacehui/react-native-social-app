import * as yup from "yup";
import { Post } from "../post";

const postSchema: yup.Schema<Post> = yup.object<Post>();

export const postListResponseSchema: yup.ArraySchema<Post> = yup
  .array()
  .of(postSchema);
