import { AbandonApplication } from "./abandon.types";

export type AbandonItems = Pick<
  AbandonApplication,
  "rating" | "message" | "stepAbandon" | "formSnapshot"
>;
