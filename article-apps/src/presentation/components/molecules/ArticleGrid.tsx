import { Card, Col, Popover, Row } from "antd";
import React from "react";
import type { Article } from "../../../domain/entities/Article";

const { Meta } = Card;

type Props = {
  articles: Article[];
  onArticleClick: (article: Article, id: string | number) => void;
};

const ArticleGrid: React.FC<Props> = ({ articles, onArticleClick }) => {
  return (
    <Row gutter={[16, 16]} justify="center" style={{ padding: "20px" }}>
      {articles.map((article, index) => (
        <Col key={index} span={8}>
          <Popover content="Click to see details">
            <Card
              onClick={() =>
                onArticleClick(article, article.source.id || index)
              }
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
          </Popover>
        </Col>
      ))}
    </Row>
  );
};

export default ArticleGrid;
