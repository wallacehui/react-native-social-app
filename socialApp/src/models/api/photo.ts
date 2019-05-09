import * as yup from "yup";
import { Photo } from "../photo";

const photoSchema: yup.Schema<Photo> = yup.object<Photo>();

export const photoListResponseSchema: yup.ArraySchema<Photo> = yup
  .array()
  .of(photoSchema);
