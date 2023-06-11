import logo from "./logo.svg";
import "./App.css";

// 이건 컴포넌트
function Header(props) {
  return (
    <header>
      <h1>
        <a href="/">{props.title}</a>
      </h1>
    </header>
  );
}
// props로 각 태그의 값을 다르게 줄 수 있따
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.title}>
        <a href={"/read/" + t.id}>{t.title}</a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function App() {
  const topics = [
    { id: 1, title: "안녕", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  return (
    <div className="App">
      <Header title="asd"></Header>
      <Nav topics={topics}></Nav>
      <article>
        <h2>Welcome</h2>
        Hello, WEB
      </article>
    </div>
  );
}

export default App;
