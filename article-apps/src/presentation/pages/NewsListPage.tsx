import { Alert, Empty, Pagination, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FetchPopularNews } from "../../application/usecases/fetchPopularNews";
import type { Article } from "../../domain/entities/Article";
import { NewsApiRepository } from "../../infrastructure/api/NewsApiRepository";
import LoadingSpiner from "../components/atoms/LoadingSpiner";
import ArticleGrid from "../components/molecules/ArticleGrid";
import ArticleSearch from "../components/molecules/ArticleSearch";

const { Title } = Typography;
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const pageSize = 20; // Default page size

const NewsListPage: React.FC = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("apple");

  const getListArticle = useCallback(async () => {
    setLoading(true);
    const repo = new NewsApiRepository(apiUrl, apiKey, page, search);
    const usecase = new FetchPopularNews(repo);

    usecase
      .execute()
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
        setTotalPages(Math.ceil(data.totalResults / pageSize));
      })
      .catch((error) => {
        setLoading(false);
        setError("Limit Hit APIs Data");
        console.log("err", error);
      });
  }, [page, search]);

  useEffect(() => {
    setLoading(true);
    setArticles([]);

    if (apiUrl && apiKey) getListArticle();
  }, [getListArticle]);

  const handleNavigate = (article: Article, id: string | number) => {
    localStorage.setItem("articleDetail", JSON.stringify(article));
    navigate(`/detail/${id}`);
  };

  return (
    <>
      {error && (
        <Alert
          message={error}
          type="error"
          closable
          onClose={() => {
            setPage(1);
            setError(undefined);
          }}
        />
      )}

      <Title>LIST ARTICLE {search.toUpperCase()}</Title>
      <ArticleSearch loading={loading} onSearch={setSearch} />
      <LoadingSpiner isShow={loading} />
      <ArticleGrid articles={articles} onArticleClick={handleNavigate} />

      {!loading && articles.length === 0 && <Empty />}
      {!loading && articles.length > 0 && (
        <Pagination
          align="end"
          responsive={true}
          defaultCurrent={page}
          total={totalPages}
          onChange={(page) => setPage(page)}
        />
      )}
    </>
  );
};

export default NewsListPage;
