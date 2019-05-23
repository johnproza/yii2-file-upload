import React,{Component,Fragment,Suspense} from "react";
import {connect} from 'react-redux';
import {ListGroupItem, Badge} from 'reactstrap';
const ModalWindow = React.lazy(()=>import(/* webpackChunkName: "system" */  './../include_module/modal'));
const ModalContent = React.lazy(()=>import(/* webpackChunkName: "system" */  './../include_module/modalContent'));

class ItemFolder extends Component {
    constructor(props){
        super(props)
        this.state={
            modalToggle:false,
        }
    }

    render(){
        return (
            <Fragment>
                <Suspense fallback={"Загрузка сообщения"}>
                    {
                        this.state.modalToggle ? <ModalWindow data={
                            <ModalContent event={{
                                ok:()=>this.removeItem(this.props.item.path,this.props.item.name),
                                cancel:this.toggleModal
                            }}
                                          text ={{
                                              ok: "Удалить",
                                              cancel : "Отмена",
                                          }}

                            />
                        }
                                                              title={"Хотие удалить?"} close={this.toggleModal} /> : null
                    }
                </Suspense>

                <ListGroupItem className="item folder" >
                    <div onClick={this.props.event.open}>
                        <i className="icon ion-md-folder"></i>{this.props.item.name}
                    </div>
                    <div className="system">
                        <Badge color="secondary">{this.props.item.size} kb</Badge>
                        <Badge color="info">{new Date(this.props.item.createAt*1000).toLocaleString()}</Badge>
                        <i className="icon "></i>
                        <i className="icon ion-md-trash" onClick={this.toggleModal}></i>
                    </div>
                </ListGroupItem>

            </Fragment>
        )
    }

    toggleModal =(id,name) =>{

        this.setState({
            modalToggle: !this.state.modalToggle
        })
    }

    removeItem = (id,name)=>{
        this.setState({
            modalToggle: !this.state.modalToggle
        });
        this.props.event.remove(id,name)
    }


}

const mapStateToProps = (state) => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(ItemFolder)