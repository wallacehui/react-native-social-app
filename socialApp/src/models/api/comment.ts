import * as yup from "yup";
import { Comment } from "@babel/types";

const commentSchema: yup.Schema<Comment> = yup.object<Comment>();

export const commentListResponseSchema: yup.ArraySchema<
  Comment
> = yup.array().of(commentSchema);
