import { Card } from "antd";
import React, { useEffect, useState } from "react";

import { FetchPopularNews } from "../../application/usecases/fetchPopularNews";
import type { Article } from "../../domain/entities/Article";
import { NewsApiRepository } from "../../infrastructure/api/NewsApiRepository";

const { Meta } = Card;

const NewsListPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    if (apiUrl && apiKey) {
      const repo = new NewsApiRepository(apiUrl, apiKey);
      const usecase = new FetchPopularNews(repo);

      usecase.execute().then(setArticles).catch(console.error);
    }
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {articles.map((article, index) => (
        <Card
          key={index}
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt={article.title}
              src={article.urlToImage}
              style={{ height: 160, objectFit: "cover" }}
            />
          }
        >
          <Meta title={article.title} description={article.url} />
        </Card>
      ))}
    </div>
  );
};

export default NewsListPage;
