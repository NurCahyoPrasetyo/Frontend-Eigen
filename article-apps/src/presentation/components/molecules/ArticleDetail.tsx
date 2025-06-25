// presentation/components/molecules/ArticleDetail.tsx
import { Divider, Flex, Image, Splitter, Typography } from "antd";
import React from "react";
import { Article } from "../../../domain/entities/Article";
import { formatToSimpleDate } from "../../../utils/dateFormatter";

const { Title } = Typography;

type Props = {
  article: Article;
};

const ArticleDetail: React.FC<Props> = ({ article }) => {
  return (
    <Splitter style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <Splitter.Panel defaultSize="40%" min="20%" max="70%">
        <Flex gap="middle" align="center" justify="space-between" vertical>
          <Image
            width={"100%"}
            src={
              article.urlToImage || "https://placehold.co/600x400?text=No+Image"
            }
          />
          <p>{article.source.name}</p>
        </Flex>
      </Splitter.Panel>
      <Splitter.Panel>
        <div className="box-contents">
          <Title level={2}>{article.title}</Title>
          <Flex gap="middle" align="center" justify="space-between">
            <p>{article.author}</p>
            <p>{formatToSimpleDate(article.publishedAt)}</p>
          </Flex>
          <Divider />
          <div className="flex-contnts">
            <p>{article.content}</p>
            <p>{article.description}</p>
          </div>
        </div>
      </Splitter.Panel>
    </Splitter>
  );
};

export default ArticleDetail;
