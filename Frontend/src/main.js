/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');

    require('./API').getPizzaList(function(error, data){
       require("./pizza/PizzaMenu").initialiseMenu(data);
    });

    PizzaCart.initialiseCart();
    require('./ButtonsDisabler').disable();

    require('./ButtonsDisabler').check();

});