import { Input } from "antd";
import React from "react";

type Props = {
  loading: boolean;
  onSearch: (value: string) => void;
};

const ArticleSearch: React.FC<Props> = ({ loading, onSearch }) => {
  return (
    <Input.Search
      placeholder="Search articles..."
      onSearch={onSearch}
      enterButton
      loading={loading}
      style={{ marginBottom: 24 }}
    />
  );
};

export default ArticleSearch;
