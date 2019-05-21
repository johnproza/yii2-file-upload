import React,{Component,Fragment,Suspense} from "react";
import {connect} from 'react-redux';
import { ButtonGroup, Button} from 'reactstrap';
const ModalWindow = React.lazy(()=>import(/* webpackChunkName: "system" */  './../include_module/modal'));
const ModalContent = React.lazy(()=>import(/* webpackChunkName: "system" */  './../include_module/modalContent'));
const FormFolder = React.lazy(()=>import(/* webpackChunkName: "note-tree" */  './formFolder'));

class Panel extends Component {
    constructor(props){
        super(props)
        this.state={
            modalCreate:false
        }
    }

    render(){
        return (
            <Fragment>
                <Suspense fallback={"Загрузка сообщения"}>
                    {
                        this.state.modalCreate ? <ModalWindow data={
                            <ModalContent event={{
                                ok:this.createFolder,
                                cancel:this.toggleModalCreate
                              }}
                              text ={{
                                  ok: "Создать",
                                  cancel : "Отмена",
                                  message : <FormFolder />
                              }}

                            />
                        }
                      title={"Хотие создать новую папку?"} close={this.toggleModalCreate} /> : null
                    }
                </Suspense>
                <ButtonGroup className="panel_upload">
                    <Button color="success" onClick={this.toggleModalCreate}>Создать папку</Button>
                    <Button color="info">Загрузить файл</Button>
                </ButtonGroup>
            </Fragment>

        )
    }

    toggleModalCreate = () =>{
        this.setState(()=>{
            return{
                modalCreate: !this.state.modalCreate
            }
        })
    }

    createFolder = () =>{
        let val = document.getElementById('folderName').value;
        let path = this.props.path[this.props.path.length-1].path;

        fetch(`/file/api/create-folder?path=${path}&name=${val}`)
            .then((response)=>response.json())
            .then((json)=>{
                console.log(json);
                if(json.status){
                    this.props.dispatch({
                        type:"CREATE_FOLDER",
                        data:{
                            name:val,
                            path:`${path}/${val}`
                        }
                    })
                    this.setState({
                        modalCreate: !this.state.modalCreate
                    })
                }
            })
    }



}

const mapStateToProps = (state) => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(Panel)