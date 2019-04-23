/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart-info");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
var contains=false;
    //Приклад реалізації, можна робити будь-яким іншим способом
    Cart.forEach(function(el){
        if(pizza.id==el.pizza.id && size==el.size ) {
            contains=true;
            el.quantity+=1;
        }
        });
    if(!contains){
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }
    $money = $cart.parent().find(".price-span");
    var m = parseInt($money.text());
    m += pizza[size].price;
    $money.text(m);
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {

    var html_code = Templates.PizzaCart_OneItem(cart_item);

    var $node = $(html_code);
    Cart.pop(cart_item);
    $node.remove();
    $money=$cart.parent().find(".price-span");
    var m=parseInt($money.text())-parseInt($node.find(".money").text()*cart_item.quantity);

    $money.text(m);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    Cart=JSON.parse(localStorage.getItem("Cart"));
    $money = $cart.parent().find(".price-span");
    if(Cart!=null) {
        $money.text(JSON.parse(localStorage.getItem("Money")));
    }else{
        $money.text("0");
        Cart=[];
    }
    var $father=$cart.parent();
    $father.find(".cleanup").click(function(){
        $father.find(".price-span").text(0);
        Cart=[];
        updateCart();
    });


    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц

            cart_item.quantity += 1;
            $money=$cart.parent().find(".price-span");
            var m=parseInt($money.text())+parseInt($node.find(".money").text());

            $money.text(m);
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".btn-default").click(function(){
            removeFromCart(cart_item);
        });
        $node.find(".minus").click(function(){
            if(cart_item.quantity==1)
                removeFromCart(cart_item);
            else {
                cart_item.quantity -= 1;
                $money=$cart.parent().find(".price-span");
                var m=parseInt($money.text())-parseInt($node.find(".money").text());

                $money.text(m);
                updateCart();
            }
        });

        $cart.append($node);
    }
        if(Cart){
        localStorage.setItem("Cart",JSON.stringify(Cart));
        localStorage.setItem("Money",JSON.stringify($money.text()));
        }

    if( !Cart.length==0) {
        $(".buybutt").removeClass("disabled");
    }
    else {
        $(".buybutt").addClass("disabled");
    }

       Cart.forEach(showOnePizzaInCart);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;