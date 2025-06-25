import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Article } from "../../domain/entities/Article";
import LoadingSpiner from "../components/atoms/LoadingSpiner";
import ArticleDetail from "../components/molecules/ArticleDetail";

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
          <ArticleDetail article={data} />
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
