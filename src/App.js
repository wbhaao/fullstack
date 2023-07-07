import { useState } from "react";

function App() {
    const [ toDo, setToDo ] = useState("");
    const [ toDos, setToDos ] = useState([]);
    const onChange = (event) => setToDo(event.target.value)
    const onSubmit = (event) => {
        event.preventDefault()
        if (toDo == ''){
            return;
        }
        // 넣지 않으면 enter해도 값이 안사라짐
        setToDo("")
        // 이렇게 변경 할 수 없음
        // toDos.push()

        // let newToDos = toDos
        // newToDos.push(toDo)
        // {or}
        // newToDos = [toDo, ...toDos]
        console.log(toDos)
        setToDos([toDo, ...toDos])
    }
    return (
        <div>
            <h1>My To Dos ({toDos.length})</h1>
            <form onSubmit={onSubmit}>
                <input 
                onChange={onChange} 
                value={toDo}
                type="text" 
                placeholder="Write here"
                />
                <button>Add To Do</button>
            </form>
        </div>
    )
}

export default App