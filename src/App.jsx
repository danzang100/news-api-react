import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("general");

  const api_key = "6d66302555ce4bbc8de797d2cfb3a179";
  const end_point = "https://newsapi.org/v2/top-headlines";

  useEffect(
    function () {
      async function getNews() {
        setIsLoading(true);
        let data = await fetch(
          `${end_point}?apiKey=${api_key}&category=${currentCategory}`
        );
        let info = await data.json();
        if (info.status === "ok") {
          setIsLoading(false);
          setNews(info.articles);
        }
      }
      getNews();
    },
    [currentCategory]
  );
  return (
    <>
      <Header />

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <NewsList news={news} setNews={setNews} />}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header() {
  const appTitle = "Insta-News";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Main Logo" />
        <h1>{appTitle}</h1>
      </div>
    </header>
  );
}

const CATEGORIES = [
  { name: "general", color: "#8b5cf6" },
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "business", color: "#ef4444" },
  { name: "sports", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
];

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        {CATEGORIES.map((cat) => (
          <li className="category" key={cat.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function NewsList({ news, setNews }) {
  if (news.length === 0) {
    return <p className="message">Error. No news found.</p>;
  }
  return (
    <section>
      <ul className="news-list">
        {news.map((item) => (
          <Item key={item.id} item={item} setNews={setNews} />
        ))}
      </ul>
    </section>
  );
}

function Item({ item }) {
  return (
    <li className="item">
      <p>
        {item.title}
        <a href={item.url} className="source">
          (Source)
        </a>
      </p>
    </li>
  );
}

export default App;
