




exports.disable=function disable(){
    if($(".buybutt").hasClass("btn-primary"))
    {
        $(".plus").addClass("disabled");
        $(".minus").addClass("disabled");
        $(".delete").addClass("disabled");
    }else{
        $(".plus").removeClass("disabled");
        $(".minus").removeClass("disabled");
        $(".delete").removeClass("disabled");
    }
};

exports.check= function checkName(){

  var $input=$("#inputName");
  var $inputAdres=$("#inputAdres");
  var $inputPhone=$("#inputPhone")
  var $submit=$(".submit-form");
  $submit.click(function(){

      if($input.val().length==0){
          $(".name-input").removeClass("has-success");
          $(".name-input").addClass("has-error");
      } else{
          $(".name-input").removeClass("has-error");
          $(".name-input").addClass("has-success");
      }

      if($inputAdres.val().length==0){
          $(".adres-input").removeClass("has-success");
          $(".adres-input").addClass("has-error");
      } else{
          $(".adres-input").removeClass("has-error");
          $(".adres-input").addClass("has-success");
      }

      if($inputPhone.val().length==11 && !isNaN($inputPhone.val()))
      {
          $(".phone-input").removeClass("has-error");
          $(".phone-input").addClass("has-success");
      }else{
          $(".phone-input").removeClass("has-success");
          $(".phone-input").addClass("has-error");
      }

      if( $(".phone-input").hasClass("has-success")
          && $(".adres-input").hasClass("has-success")
          &&  $(".name-input").hasClass("has-success") )
      {
          require('./API').createOrder({name:$input.val(),phone:$inputPhone.val()
          ,adres:$inputAdres.val(),pizza:JSON.parse(localStorage.getItem("Cart"))},function(){
              console.log("success");
          });
      }

  });
};