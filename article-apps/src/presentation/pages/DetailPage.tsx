import { Button, Divider, Flex, Image, Splitter, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Article } from "../../domain/entities/Article";
import LoadingSpiner from "../components/atoms/LoadingSpiner";

const { Title } = Typography;

const DetailPage: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getFromLocalStorage = useCallback(() => {
    const data = localStorage.getItem("articleDetail");
    setLoading(data === null);
    setData(data ? JSON.parse(data) : null);
  }, []);

  useEffect(() => {
    getFromLocalStorage();
  }, [getFromLocalStorage]);

  const formatToSimpleDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  console.log(data);

  return (
    <div className="flex-contnts">
      <Button
        type="primary"
        danger
        ghost
        style={{ width: "40%" }}
        onClick={() => navigate("/")}
      >
        BACK TO HOME
      </Button>

      {!loading && data !== null ? (
        <>
          <Splitter style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <Splitter.Panel defaultSize="40%" min="20%" max="70%">
              <Flex
                gap="middle"
                align="center"
                justify="space-between"
                vertical
              >
                <Image
                  width={"100%"}
                  src={
                    data.urlToImage ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                />
                <p>{data.source.name}</p>
              </Flex>
            </Splitter.Panel>
            <Splitter.Panel>
              <div className="box-contents">
                <Title level={2}>{data.title}</Title>

                <Flex gap="middle" align="center" justify="space-between">
                  <p>{data.author}</p>
                  <p>{formatToSimpleDate(data.publishedAt)}</p>
                </Flex>

                <Divider />

                <div className="flex-contnts">
                  <p>{data.content}</p>
                  <p>{data.description}</p>
                </div>
              </div>
            </Splitter.Panel>
          </Splitter>
          <Button
            type="primary"
            size="large"
            block
            onClick={() => window.open(data.url, "_blank")}
          >
            READ MORE
          </Button>
        </>
      ) : (
        <LoadingSpiner isShow={loading} />
      )}
    </div>
  );
};

export default DetailPage;
