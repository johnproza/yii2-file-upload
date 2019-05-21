import React, {Component, Fragment} from 'react';
import { Button} from 'reactstrap';
export default class ModalContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <div>{this.props.text.message}</div>
                <Button color="primary" size="lg" onClick={this.props.event.ok} block >{this.props.text.ok}</Button>
                <Button color="secondary" size="lg" onClick={this.props.event.cancel} block>{this.props.text.cancel}</Button>
            </Fragment>
        )

    }

}

