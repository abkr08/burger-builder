import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENTS_PRICE = {
    salad: 0.2,
    cheese: 0.4,
    meat: 1.4,
    bacon: 1.2
};
class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0,
        },
        totalPrice: 4,
        purchasable: false, 
        purchasing: false
    }

    purchaseModeHandler = () => {
        this.setState({purchasing: true});
    }
    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('Purchase successful! Fulfilling Order...');
        this.setState({purchasing: false});
    }
    
    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients}; 
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const ingredientPrice = INGREDIENTS_PRICE[type];
        const newPrice = oldPrice + ingredientPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice}) 
        this.updatePurchasableState(updatedIngredients);
    }

    updatePurchasableState = ( ingredients ) => {
        const sum = Object.keys(ingredients).map(ing => {
            return ingredients[ing];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        let purchasableDetail = false;
        if (sum > 0){
            purchasableDetail = true;
        } 
        this.setState({purchasable: purchasableDetail});

    }
    removeIngredientHandler =  ( type ) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return null;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients}; 
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const ingredientPrice = INGREDIENTS_PRICE[type];
        const newPrice = oldPrice - ingredientPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchasableState(updatedIngredients);
    }


    render (){
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        

        return (
            <Aux>
                
                <Modal showModal={this.state.purchasing}
                modalClosed = {this.cancelPurchaseHandler}> 
                    <OrderSummary purchaseContinue = {this.purchaseContinueHandler} cancelPurchase = {this.cancelPurchaseHandler} ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    addIngredient = { this.addIngredientHandler} 
                    removeIngredient = { this.removeIngredientHandler}
                    price = {this.state.totalPrice}
                    disabled = {disabledInfo}
                    showModal = {this.purchaseModeHandler}
                    purchasable = {this.state.purchasable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;