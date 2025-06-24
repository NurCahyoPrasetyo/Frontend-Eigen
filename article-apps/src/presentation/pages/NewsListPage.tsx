import { Breadcrumb, Card, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";

import { FetchPopularNews } from "../../application/usecases/fetchPopularNews";
import reactLogo from "../../assets/react.svg";
import type { Article } from "../../domain/entities/Article";
import { NewsApiRepository } from "../../infrastructure/api/NewsApiRepository";

const { Meta } = Card;
const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

export const NewsListPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {articles.map((article, index) => (
              <Card
                key={index}
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt={article.title}
                    src={article.urlToImage || reactLogo}
                    style={{ height: 160, objectFit: "cover" }}
                  />
                }
              >
                <Meta title={article.title} description={article.url} />
              </Card>
            ))}
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
