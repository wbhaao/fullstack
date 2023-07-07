import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}
function Header(props) {
    return (
        <header>
            <h1>
                <a
                    href="/"
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChangeMode();
                    }}
                >
                    {props.title}
                </a>
            </h1>
        </header>
    );
}
function Nav(props) {
    const lis = [];
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(
            <li key={t.id}>
                <a
                    id={t.id}
                    href={"/read/" + t.id}
                    onClick={(event) => {
                        event.preventDefault();
                        props.onChangeMode(Number(event.target.id));
                    }}
                >
                    {t.title}
                </a>
            </li>
        );
    }
    return (
        <nav>
            <ol>{lis}</ol>
        </nav>
    );
}
function Create(props) {1
    return (
        <article>
            <h2>Create</h2>
            <form onSubmit={event => {
                event.preventDefault()
                const title = event.target.title.value;
                const body = event.target.body.value;
                props.onCreate(title, body)
            }}>
                <input type="text" name="title" placeholder="title "></input>
                <br/>
                <textarea name="body" placeholder="body"></textarea>
                <br />
                <input type="submit" value="Create"/>
            </form>
        </article>
    );
}
function Update(props) {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
    
    return (
        <article>
            <h2>Update</h2>
            <form onSubmit={event => {
                event.preventDefault()
                const title = event.target.title.value;
                const body = event.target.body.value;
                props.onUpdate(title, body)
            }}>
                <input type="text" value={title} name="title" onChange={event => {
                    console.log(event.target.value)
                    setTitle(event.target.value)
                }} placeholder="title "></input>
                <br/>
                <textarea name="body" value={body} placeholder="body" onChange={event => {
                    console.log(event.target.value)
                    setBody(event.target.value)
                }}></textarea>
                <br/>
                <input type="submit" value="Update"/>
            </form>
        </article>
    );
}
function App() {
    const [mode, setMode] = useState("WELCOME");
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(3);
    const [topics, setTopics] = useState([
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "javascript", body: "javascript is ..." },
    ]);
    let content = null;
    let contextControl = null;
    if (mode === "WELCOME") {
        content = <Article title="Welcome" body="Hello, WEB"></Article>;
    } else if (mode === "READ") {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            console.log(topics[i].id, id);
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}></Article>;
        contextControl = <><a href={"/update/"+id} onClick={event => {
                event.preventDefault();
                setMode("UPDATE")
        }}>update</a>
            <input type="button" value="Delete" onClick={() => {
                const newTopics = []
                for (let i = 0; i < topics.length; i++) {
                    if (topics[i].id !== id) {
                        newTopics.push(topics[i])
                    }
                }
                setTopics(newTopics)
                setMode('WELCOME')
        }}></input></>
    } else if (mode === 'CREATE') {
        content = <Create onCreate={(_title, _body) => {
            const newTopic = {id:nextId, title:_title, body:_body}
            const newTopics = [...topics]
            newTopics.push(newTopic)
            setTopics(newTopics);
            setMode('READ');
            setId(nextId);
            setNextId(nextId+1)
        }}></Create>
    } else if (mode === 'UPDATE') {
        let title,
            body = null;
        for (let i = 0; i < topics.length; i++) {
            console.log(topics[i].id, id);
            if (topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Update title={title} body={body} onUpdate={(_title, _body) => {
            console.log(title, body);
            const updatedTopic = { title: title, body: body, id: id }
            const newTopics = [...topics]
            for (let i = 0; i < newTopics.length; i++) {
                if (newTopics[i].id === id) {
                    newTopics[i] = updatedTopic;
                    break;
                }
                
            }
            setTopics(newTopics)
            setMode('READ');

        }}></Update>
    }
    return (
        <div>
            <Header
                title="WEB"
                onChangeMode={() => {
                    setMode("WELCOME");
                }}
            ></Header>
            <Nav
                topics={topics}
                onChangeMode={(_id) => {
                    setMode("READ");
                    setId(_id);
                }}
            ></Nav>
            {content}
            <a href="/create" onClick={event => {
                event.preventDefault();
                setMode("CREATE")
            }}>create</a> 
            { contextControl}
        </div>
    );
}

export default App;
