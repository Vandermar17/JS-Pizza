/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = null;

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
    $("#orangebage").text(list.length);
}



function initialiseMenu(data) {
    //Показуємо усі піци
    Pizza_List=data;
    showPizzaList(Pizza_List);
    var currentSelected="everyone-small";
    $("#everyone-small").click(function(){
        $("#"+currentSelected).css("background-color","white");
        $(this).css("background-color","orange");
        currentSelected="everyone-small";
        showPizzaList(Pizza_List);
    });
    $("#М’ясна-піца").click(function(){
        $("#"+currentSelected).css("background-color","white");
        $(this).css("background-color","orange");
        currentSelected="М’ясна-піца";
        var list=Pizza_List.filter(function(el){
            return el.type=="М’ясна піца";
        }) ;
        showPizzaList(list);
    });
    $("#Ананасова-піца").click(function(){
        $("#"+currentSelected).css("background-color","white");
        $(this).css("background-color","orange");
        currentSelected="Ананасова-піца";
        var list=Pizza_List.filter(function(el){
            return el.type=="Ананасова піца";
        }) ;
        showPizzaList(list);
    });
    $("#Морська-піца").click(function(){
        $("#"+currentSelected).css("background-color","white");
        $(this).css("background-color","orange");
        currentSelected="Морська-піца";
        var list=Pizza_List.filter(function(el){
            return el.type=="Морська піца";
        }) ;
        showPizzaList(list);
    });
    $("#Грибна-піца").click(function(){
        $("#"+currentSelected).css("background-color","white");
        $(this).css("background-color","orange");
        currentSelected="Грибна-піца";
        var list=Pizza_List.filter(function(el){
            return el.type=="Грибна піца";
        }) ;
        showPizzaList(list);
    });
    $("#Вега-піца").click(function(){
        $("#"+currentSelected).css("background-color","white");
        $(this).css("background-color","orange");
        currentSelected="Вега-піца";
        var list=Pizza_List.filter(function(el){
            return el.type=="Вега піца";
        }) ;
        showPizzaList(list);
    });


}


exports.initialiseMenu = initialiseMenu;