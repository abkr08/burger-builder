import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../hoc/Aux/Aux';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

class Modal extends Component {
    
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }
    render (){
        return (
            <Aux>
                <Backdrop show={this.props.showModal} backdropClicked = {this.props.modalClosed}/>
                <div 
                className = {classes.Modal}
                style = {{
                    transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.showModal ? '1' : '0'
                }}
                > {this.props.children} </div>
            </Aux>
        );


    }    
};

export default Modal; 