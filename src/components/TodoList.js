import { useState ,useRef, useEffect} from "react";
import './TodoList.css';

const AddButton = (props) => {
    return(
        <button className="addButton" onClick={props.pushButton}>Add item</button>
    )
} 
 
const ItemList = (props) => {
    const [items, setItems] = useState([]);
    let newId = useRef(0);

    const changeText = (newText, key) => {
        setItems(items.map((item)=>{
            if(item.id === key){
                return {
                    ...item,
                    text: newText
                }
            }
            return item;
        }))
    }
    const deleteItem = (id) => {
        setItems(items.filter((item)=>{
            return item.id!==id;
        }))
    }
    const toggleCheckbox = (checked, id)=>{
        setItems(items.map((item)=>{
            if(item.id === id)
                return {
                    ...item,
                    checked: checked
                };
            return item
        }))
    }
    useEffect(()=>{
        console.log(items);
    },[items])
    return (
        <div>
        {
            items.map((item)=><Item deleteItem={deleteItem} onCheckToggle={toggleCheckbox} key={item.id} value={item} onInputValueChange={changeText}/>)
        }
        <AddButton pushButton={()=>{
            setItems([...items, {id:newId.current, text:'', checked: false}])
            newId.current = newId.current+1;
        }}/>
        </div>
    )
}

const Item = (props) => {
    const [editing, setEditing] = useState(false);
    const {value,  deleteItem, onInputValueChange, onCheckToggle} = props; 
    const inputRef = useRef(null);
     useEffect(() => {
        if (editing) {
          inputRef.current.focus();
        }
      }, [editing]);

    const onClickListener = () => {
        setEditing(true);
        inputRef?.current?.focus();
    }

    const onBlurListener = () => {
        setEditing(false);
    }

    const checkEnter = (e)=>{
        if(e.keyCode===13 || e.keyCode===27)
            onBlurListener()
    }
    const onEditField = (e)=>{
        onInputValueChange(e.target.value, value.id)

    }
    const removeItem = () => {
        deleteItem(value.id);
    }
    const onCheckboxClicked = (e) => {
        onCheckToggle(e.target.checked, value.id);
    }
    return(
        <div className="textBlock">
            <input type="checkbox" onChange={onCheckboxClicked}/>
            {
                editing ? 
                    <input 
                        onKeyDown={checkEnter} 
                        onChange={onEditField} 
                        ref={inputRef} 
                        onBlur={onBlurListener} 
                        value={value.text}/> : 
                    <p onClick={onClickListener}>{value.text ? value.text: 'Click to edit'}</p>
            }
            <button onClick={removeItem}>X</button>
        </div>
    )
}

const TodoList  = (props) => {
     
    return(
        <div className="herlet">
            <div className="titleBox">TodoList</div>
            <ItemList  />
            
        </div>
    )
}
export default TodoList;