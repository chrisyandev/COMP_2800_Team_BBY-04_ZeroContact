import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Draggable from 'react-draggable';

class DropArea extends React.Component{
    render(){
        return(
            <div className="inventory-drop-zone">
                <h2>Drag your items here to use it</h2>
            </div>
        );
    }
}

class ItemSlot extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            itemType: props.itemType,
        }
    }
    state = {
        activeDrags: 0,
        deltaPosition: {
          x: 0, y: 0
        },
        controlledPosition: {
          x: 0, y: 0
        }
    };

    

    onControlledDragStop = (e, position) => {
        console.log(position);
        if (position.y >= 51) {
            this.props.onItemDrop(this.state.itemType);
            this.setState({
                controlledPosition: {x:position.x, y:position.y}
            })
        } else{
            this.setState({
                controlledPosition: {x:0, y:0}
            });
        }
    };

    render(){
        return(
            <Draggable bounds=".inventory-box" 
                       onStop={this.onControlledDragStop}
                       position={this.state.controlledPosition}
                       onDrag={this.handleDrag}>
                <div className="inventory-item-slot">
                    <img alt="placeholder" 
                         src="https://via.placeholder.com/50/09f/fff.png%20C/O%20https://placeholder.com/"
                         draggable="false">
                    </img>
                </div>
            </Draggable>
        );
    }
}

class Inventory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            onItemDrop: props.onItemDrop,
            itemTypeArray: ["oranges", "apples", "medicine"],
        }
    }

    itemRemove(i){
        let items = this.state.itemTypeArray.splice();
        items[i] = null;

        this.setState({
            itemTypeArray: items,
        });
    }

    // Creates an array and renders all the item slots using the ItemSlot component
    renderItemSlots(){
        const items = [];
        for (let i = 0; i < this.state.itemTypeArray.length; i++){
            if (this.state.itemTypeArray[i] !== null){
                let slot = 
                <div className="item-slot" key={i}>
                    <ItemSlot itemType={this.state.itemTypeArray[i]} 
                    onItemDrop={this.props.onItemDrop}
                    onItemRemove={() => this.itemRemove(i)} />
                </div>
                items.push(slot);
            }
        }
        return(items);
    }

    render(){
        return(
            <div className="inventory-items">
                    {this.renderItemSlots()}
            </div>
        );
    }
}

class InventoryContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            items: 0,
            itemHistory: [],
        }
    }

    handleItemDrop(evt){
        console.log(evt);
        console.log(this);

        let newItems = this.state.itemHistory.slice();
        newItems.push(evt);
        if (this !== undefined){
            this.setState({
                items: this.state.items+1,
                itemHistory: newItems,
            });
        }
    }

    render(){
        return(
            <div>
                <div className="inventory-box">
                    <h1>-Inventory-</h1>
                    <Inventory onItemDrop = {(e) => this.handleItemDrop(e)}/>
                    <DropArea />
                </div>
                <h1>
                    Items Used: {this.state.items}
                    <hr></hr>
                    Item History:
                </h1>
                {this.state.itemHistory.map(element => ( 
                    <h2 key={element}>{element}</h2>
                ))}
            </div>
            
        );
    }
}

ReactDOM.render(<InventoryContainer />,document.getElementById("root"));

