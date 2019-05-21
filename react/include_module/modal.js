import React, {Component, Fragment} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class ModalWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: true,
        }
    }

    render() {
        return(
            <Fragment>
                <Modal isOpen={this.state.status} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        {this.props.data}
                    </ModalBody>
                </Modal>
            </Fragment>
        )

    }

    toggle = () =>{
        this.setState(()=>{
            return{
                status: !this.state.status
            }
        })

        this.props.close();

    }
}