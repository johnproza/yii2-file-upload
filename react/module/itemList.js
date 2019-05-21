import React,{Component,Fragment,Suspense} from "react";
import {connect} from 'react-redux';
import { ListGroup, ListGroupItem, Badge,Button} from 'reactstrap';
const ItemFile = React.lazy(()=>import(/* webpackChunkName: "note-tree" */  './itemFile'));
const ItemFolder = React.lazy(()=>import(/* webpackChunkName: "note-tree" */  './itemFolder'));

class ItemList extends Component {
    constructor(props){
        super(props)
        this.state={
            modalToggle:false,
        }
    }

    render(){
        return (
            <Fragment>
                <ListGroup className="list_items">
                    {this.props.store.folders.map((item,i)=>{
                        return <ItemFolder key={i} event={{
                            remove: this.removeItem,
                            download: this.download,
                            open:()=>this.props.open(item.path,item.name)
                        }} item={item}  />
                    })}
                    {this.props.store.files.map((item,i)=>{
                        return <ItemFile key={i} event={{
                            remove: this.removeItem,
                            download: this.download
                        }} item={item}  />

                    })}
                </ListGroup>
            </Fragment>
        )
    }

    removeItem = (id,name)=>{
        fetch(`/file/api/remove?path=${id}`)
            .then(response => response.json())
            .then(json => {
                    if(json.status){
                        this.props.dispatch({
                            type: "REMOVE_FILES",
                            data:name
                        })

                        this.props.dispatch({
                            type: "REMOVE_FOLDER",
                            data:name
                        })
                    }
                }
            )
    }

    download = (path,name)=>{

        fetch(`/file/api/download?path=${path}`)
            .then(response => response.blob())
            .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', name);
                    document.body.appendChild(link);
                    link.click();
                }
            )
    }

}

const mapStateToProps = (state) => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(ItemList)