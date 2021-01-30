import { useState } from "react";
import './TodoList.css';

const AddButton = (props) => {
    return(
        <button onClick={props.pushButton}>+</button>
    )
}

const ItemList = (props) => {
    return (
        <div>
        {
            props.itemArray.map(item=><Item/>)
        }
        </div>
    )
}

const Item = (props) => {
    return(
        <div className="textBlock">
            <input type="checkbox"/>
            <p>Click to Add Text</p>
            <button>X</button>
        </div>
    )
}

const TodoList  = (props) => {
    const [items, setItems] = useState([]);
    return(
        <div>
            TodoList
            <ItemList itemArray={items}/>
            <AddButton pushButton={()=>{
                setItems([...items, {text:'', checked: false}])
            }}/>
        </div>
    )
}
export default TodoList;