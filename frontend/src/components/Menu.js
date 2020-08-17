import React from 'react';
import { MenuStyle, TagsStyle, MenuHeader, Item } from '../Style';
import * as DataSource from '../apis/DataSource'

export default class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newItem: {},
            newTag: '',
            items: [],
            tags: []
        }

        this.newItemChange = this.newItemChange.bind(this);
        this.submitNewItem = this.submitNewItem.bind(this);
        this.submitNewTag = this.submitNewTag.bind(this);        
    }

    componentDidMount(){
        Promise.all([
            DataSource.getMenu(),
            DataSource.getTags()
        ])
        .then(([items, tags])=>{
            console.log("items",items);
            console.log("tags", tags);
            this.setState({items: items, tags: tags});
            console.log("tags got: ", this.state);
        });
        
    }

    newItemChange(e){
        const name = e.target.name;
        const value = e.target.value;
        var newItem = {...this.state.newItem};
        newItem[name] = value;
        this.setState({newItem: newItem});
    }

    submitNewItem(e){
        e.preventDefault();
        DataSource.addItem(this.state.newItem)
        .then((res)=>{
            console.log("Added: ", this.state.newItem.name);
            this.setState({items: [...this.state.items, this.state.newItem]})
        })
        .catch((err)=>{
            console.log("Error: ", err);
        })
    }

    submitNewTag(e){
        e.preventDefault();
        const index = this.state.tags.length - 1
        DataSource.addTag(this.state.newTag)
        .then((res)=>{
            console.log("Added: ", this.state.newTag);
            this.setState({tags: [...this.state.tags, {_id: index, name: this.state.newTag}], newTag: ''});
            console.log("tags after change", this.state.tags);
        })
        .catch((err)=>{
            console.log("Error: ", err);
        });
    }

    render(){
        return (
            <div>
                <h4>Add a menu Item!</h4>
                <form onSubmit={this.submitNewItem}>
                    <label>
                        Name
                        <input name='name' type='text' value={this.state.newItem.name || ''}
                            onChange = {this.newItemChange}/>
                    </label>
                    <label>
                        Price
                        <input name='price' type='number' step="0.01" value={this.state.newItem.price || ''}
                            onChange = {this.newItemChange}/>
                    </label>
                    <label>
                        Tag
                    <select value={this.state.newItem.tag || ''} name='tag' onChange={this.newItemChange}>
                        <option value=''></option>
                        {this.state.tags.map((tag,i)=>{
                            return <option value={tag.name} key={i}>{tag.name}</option>
                        })}         
                    </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <h4>Add a new Tag!</h4>
                <form onSubmit={this.submitNewTag}>
                    <label>
                        <input type='text' value={this.state.newTag}
                            onChange = {(e)=>{this.setState({newTag: e.target.value})}}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <MenuHeader>
                    My Menu
                </MenuHeader>
                <MenuStyle>
                    {this.state.items.map((item, i)=>{
                        return (
                            <Item key={i}>
                                <h4>{item.name}</h4>
                                <h5>{item.price}</h5>
                                {item.tag ? <p>{item.tag}</p> : null}
                            </Item>
                        )
                    })}
                </MenuStyle>
                <MenuHeader>
                    Tags
                </MenuHeader>
                <TagsStyle>
                    {this.state.tags.map((tag, i)=>{
                        return (<span key={i}>{tag.name}</span>)
                    })}
                </TagsStyle>
            </div>
        )
    }
}