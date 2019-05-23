import React,{Component,Fragment,Suspense} from "react";
import {Form, Input, FormGroup, Label, CustomInput} from 'reactstrap';

export default class formFile extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Form>
                <FormGroup>
                    <Label for="uploadFileToBack">File Browser with Custom Label</Label>
                    <CustomInput type="file" id="uploadFileToBack" name="uploadFileToBack" label="Выбрать файлы" multiple/>
                </FormGroup>
                {/*<Input type="file" id="uploadFileToBack" name="uploadFileToBack" multiple />*/}
            </Form>
        )
    }
}
