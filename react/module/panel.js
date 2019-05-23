import React,{Component,Fragment,Suspense} from "react";
import {connect} from 'react-redux';
import { ButtonGroup, Button} from 'reactstrap';
const ModalWindow = React.lazy(()=>import(/* webpackChunkName: "system" */  './../include_module/modal'));
const ModalContent = React.lazy(()=>import(/* webpackChunkName: "system" */  './../include_module/modalContent'));
const FormFolder = React.lazy(()=>import(/* webpackChunkName: "note-tree" */  './formFolder'));
const FormFile = React.lazy(()=>import(/* webpackChunkName: "note-tree" */  './formFile'));

class Panel extends Component {
    constructor(props){
        super(props)
        this.state={
            modalCreate:false,
            modalFile:false
        }
    }

    render(){
        return (
            <Fragment>
                {/*мадальное окно для папки*/}
                <Suspense fallback={ this.props.store.lang.fallback.modal}>
                    {
                        this.state.modalCreate ? <ModalWindow data={
                            <ModalContent event={{
                                ok:this.createFolder,
                                cancel:this.toggleModalCreate
                              }}
                              text ={{
                                  ok: this.props.store.lang.button.add_folder,
                                  cancel : this.props.store.lang.button.cancel,
                                  message : <FormFolder />
                              }}

                            />
                        }
                      title={this.props.store.lang.message.add_folder} close={this.toggleModalCreate} /> : null
                    }
                </Suspense>
                {/*мадальное окно для файлов*/}
                <Suspense fallback={"Загрузка сообщения"}>
                    {
                        this.state.modalFile ? <ModalWindow data={
                            <ModalContent event={{
                                ok:this.uplodFile,
                                cancel:this.toggleModalFile
                            }}
                              text ={{
                                  ok: this.props.store.lang.button.add_file,
                                  cancel :  this.props.store.lang.button.cancel,
                                  message : <FormFile />
                              }}

                            />
                        }
                          title={this.props.store.lang.message.add_file} close={this.toggleModalFile} /> : null
                    }
                </Suspense>
                <ButtonGroup className="panel_upload">
                    <Button color="success" onClick={this.toggleModalCreate}>{this.props.store.lang.button.add_folder}</Button>
                    <Button color="info" onClick={this.toggleModalFile}>{this.props.store.lang.button.add_file}</Button>
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

    toggleModalFile = () =>{
        this.setState(()=>{
            return{
                modalFile: !this.state.modalFile
            }
        })
    }

    createFolder = () =>{
        let val = document.getElementById('folderName').value;
        let path = this.props.path[this.props.path.length-1].path;
        let data =new FormData();
        data.append('path',path);
        data.append('name',val);
        data.append('_csrf-backend',document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
        fetch(`/file/api/create-folder`,{
                method : "POST",
                body : data,
            })
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
            }).catch((error)=>console.log(error))
    }

    uplodFile = () =>{
        let path = this.props.path[this.props.path.length-1].path;
        let data =new FormData();
        let files=[];
        data.append('path',path);
        data.append('_csrf-backend',document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
        //Array.prototype.forEach.call(document.getElementById('uploadFileToBack').files, f => data.append("files",f));
        Array.prototype.forEach.call(document.getElementById('uploadFileToBack').files, (f,i) => {
            data.append("file",f);
            fetch(`/file/api/upload-files`,{
                method : "POST",
                body : data,
            })
                .then((response)=>response.json())
                .then((json)=>{
                    if(json.status){
                        this.props.dispatch({
                            type:"PUSH_FILES_DATA",
                            data:[{
                                name:json.name,
                                path:`${path}/${json.name}`,
                                size:json.size,
                                createAt:new Date()/1000
                            }]
                        })
                        this.setState({
                            modalFile: !this.state.modalFile
                        })
                    }
                }).catch((error)=>console.log(error))
        });
    }



}

const mapStateToProps = (state) => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(Panel)