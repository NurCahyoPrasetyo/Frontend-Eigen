import {
  Alert,
  Card,
  Col,
  Empty,
  Input,
  Pagination,
  Row,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FetchPopularNews } from "../../application/usecases/fetchPopularNews";
import type { Article } from "../../domain/entities/Article";
import { NewsApiRepository } from "../../infrastructure/api/NewsApiRepository";

const { Meta } = Card;
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

      <Title>LIST ARTICLE APPEL</Title>
      <Input.Search
        placeholder="Filled"
        variant="filled"
        onSearch={(value) => setSearch(value)}
        loading={loading}
      />

      {loading && (
        <div className="loading-contnets">
          <div className="spinner" />
        </div>
      )}

      <Row gutter={[16, 16]} justify="center" style={{ padding: "20px" }}>
        {articles.map((article, index) => (
          <Col key={index} span={8}>
            <Card
              onClick={() => navigate(`/detail/${article.source.id || index}`)}
              hoverable
              cover={
                <img
                  alt={article.title}
                  src={
                    article.urlToImage ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  style={{ height: 160, objectFit: "cover" }}
                />
              }
            >
              <Meta title={article.title} description={article.content} />
            </Card>
          </Col>
        ))}
      </Row>

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
