import { Splitter } from "antd";
import type React from "react";

const DetailPage: React.FC = () => {
  return (
    <Splitter style={{ height: 200, boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <Splitter.Panel defaultSize="40%" min="20%" max="70%">
        ahh
      </Splitter.Panel>
      <Splitter.Panel>tapss</Splitter.Panel>
    </Splitter>
  );
};

export default DetailPage;
