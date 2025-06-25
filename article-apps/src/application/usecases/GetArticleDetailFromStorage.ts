import { Article } from "../../domain/entities/Article";

export const GetArticleDetailFromStorage = (): Article | null => {
  const raw = localStorage.getItem("articleDetail");
  return raw ? JSON.parse(raw) : null;
};
