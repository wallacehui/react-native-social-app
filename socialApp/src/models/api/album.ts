import * as yup from "yup";
import { Album } from "../album";

const albumSchema: yup.Schema<Album> = yup.object<Album>();

export const albumListResponseSchema: yup.ArraySchema<Album> = yup
  .array()
  .of(albumSchema);
