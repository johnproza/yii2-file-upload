import React,{Component,Fragment,Suspense} from "react";
import {Form, Input, Button} from 'reactstrap';

export default class formFolder extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Form>
                <Input type="text" id="folderName" />
            </Form>
        )
    }
}
