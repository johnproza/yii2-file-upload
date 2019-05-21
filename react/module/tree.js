import React,{Component,Fragment,Suspense} from "react";
import {connect} from 'react-redux';
import {Breadcrumb, BreadcrumbItem  } from 'reactstrap';
const Item = React.lazy(()=>import(/* webpackChunkName: "note-tree" */ './itemList'));
const Panel = React.lazy(()=>import(/* webpackChunkName: "note-tree" */ './panel'));
class Tree extends Component{

    constructor(props){
        super(props);
        this.state ={
            modalToggle:false,
            crumbs : [{
                name:"home",
                path:"null"
            }]
        }

    }

    render(){
        console.log('store',this.props.store);
        return(

            <Fragment>
                <Breadcrumb tag="nav" listTag="div">
                    {this.state.crumbs.map((item,i)=>{
                            return <BreadcrumbItem key={i} tag="a" href={item.path} onClick={(e)=>this.breadcrumbsMove(item.path,item.name,e)}>{item.name}</BreadcrumbItem>
                        })
                    }
                </Breadcrumb>
                <Suspense fallback="Загрузка панели" >
                    <Panel path={this.state.crumbs}/>
                </Suspense>
                <Suspense fallback="Загрузка данных" >
                    <Item open={this.openFolder}/>
                </Suspense>


            </Fragment>
        )
    }

    breadcrumbsMove = (path,name,e) => {
        e.preventDefault();
        let flag = true;
        let crumbs = this.state.crumbs.filter((item)=> {
            if(item.path!=path && flag) return true;
            else if(item.path==path) {
                flag = false;
                return true;
            }
        })
        console.log(crumbs);

        this.setState({crumbs:crumbs});
        this.openFolder(path!="null"? path : null ,name,false);
    }

    openFolder = (path,name,stateUpdate=true) =>{
        console.log(2);
        fetch(`/file/api/tree?path=${path}`)
            .then(response => response.json())
            .then(json => {
                    stateUpdate?
                    this.setState({
                        crumbs:[...this.state.crumbs,{
                            name: name,
                            path : path
                        }]
                    }):null

                    this.props.dispatch({
                        type: "ADD_FOLDER_DATA",
                        data:json.folder
                    })

                    this.props.dispatch({
                        type: "ADD_FILES_DATA",
                        data:json.files
                    })


                }
            )
    }

    componentDidMount(){
        fetch('/file/api/tree')
            .then(response => response.json())
            .then(json => {

                    this.props.dispatch({
                        type: "ADD_FOLDER_DATA",
                        data:json.folder
                    })

                    this.props.dispatch({
                        type: "ADD_FILES_DATA",
                        data:json.files
                    })
                }
            )
    }
}


const mapStateToProps = (state) => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(Tree)