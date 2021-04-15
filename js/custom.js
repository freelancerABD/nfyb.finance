function w3_open() {
  document.getElementById("mySidebar").style.width = "200px";
  document.getElementById("close-icon").style.display = "flex";
  document.getElementById("close-icon").style['padding-left'] = "20px";
  document.getElementById("bread-icon").style.display = "none";
  document.getElementById("adjust").style['margin-left'] = "230px";
  var cols = document.getElementsByClassName('menu-icon');
  for(i = 0; i < cols.length; i++) {
    cols[i].style['justify-content'] = "flex-start";
    cols[i].style['padding-left'] = "20px";
  }
  var cols = document.getElementsByClassName("w3-bar-item");
  for(i = 0; i < cols.length; i++) {
    cols[i].style.display = "block";
    cols[i].style['margin-left'] = "30px";
  }  
}

function w3_close() {
  document.getElementById("mySidebar").style.width = "50px";
  document.getElementById("adjust").style['margin-left'] = "80px";
  document.getElementById("close-icon").style.display = "none";
  document.getElementById("close-icon").style['justifyContent'] = "flex-start";
  document.getElementById("bread-icon").style.display = "block";
  var cols = document.getElementsByClassName('menu-icon');
  for(i = 0; i < cols.length; i++) {
    cols[i].style['justify-content'] = "center";
    cols[i].style['padding-left'] = "0px";
    
  }
  var cols = document.getElementsByClassName("w3-bar-item");
  for(i = 0; i < cols.length; i++) {
  cols[i].style.display = "none";
  cols[i].style['margin-left'] = "0px";
}  
  
}

function menu_open() {
  jQuery("#nav-icon").toggleClass("open");
  jQuery(".left_menu_wrap").toggleClass("open");
  jQuery("html").toggleClass("menu_is_open");
}

jQuery(document).ready(function () {
  jQuery(".hero_banner").slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    pauseOnHover: false
  });

  jQuery(".teste_scroll").slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 993,
        settings: {
          arrows: false
        }
      }
    ]
  });
});


//trade nfy nft section
//sell

$("#btn-sell-nfy").on("click", function(){
  $("#orderPrice-sell-nfy").val($("#price-sell-nfy").val());
  $("#orderQuantity-sell-nfy").val($("#quantity-sell-nfy").val());
});

$("#btn-buy-nfy").on("click", function(){
  $("#orderPrice-buy-nfy").val($("#price-buy-nfy").val());
  $("#orderQuantity-buy-nfy").val($("#quantity-buy-nfy").val());
});

$("#btn-sell-eth").on("click", function(){
  $("#orderPrice-sell-eth").val($("#price-sell-eth").val());
  $("#orderQuantity-sell-eth").val($("#quantity-sell-eth").val());
});

$("#btn-buy-eth").on("click", function(){
  $("#orderPrice-buy-eth").val($("#price-buy-eth").val());
  $("#orderQuantity-buy-eth").val($("#quantity-buy-eth").val());
});


//trade nfy-eth lp nft section
//sell

/*wow = new WOW(
  {
    boxClass: 'wow',
		offset: 100,
		mobile: true,
		live: true
	}
  )
  wow.init();*/

jQuery("document").ready(function ($) {
  jQuery("select").niceSelect();
  //if(jQuery(window).width() > 991)  {
$(".trade-btn-holdder").on("click", function(){
  $(this).next(".order-input-area").removeClass("opacity");
});


$(".cancel-label").on('click', function(){
  ($(this).parent().parent().addClass("opacity"));
});


/*$("#deposit-scrollbox ul").on("click", function(){
  $("#deposit-scrollbox ul").each(function(){
    $(this).removeClass("scroll-item-selected");
  });
  $(this).addClass("scroll-item-selected");
});*/



  $(".toggle-button").on("change", function (){
    if($(".toggle-button").is(":checked")){
      //withdraw
      $("#deposit-scrollbox").addClass("hidden");
      $("#deposit-title").addClass("darker-title");
      $("#withdraw-title").removeClass("darker-title");
      $("#deposit-button").addClass("hidden");
      $("#withdraw-button").removeClass("hidden");
    }else{
      //deposit
      $("#deposit-title").removeClass("darker-title");
      $("#withdraw-title").addClass("darker-title");
      $("#deposit-button").removeClass("hidden");
      $("#withdraw-button").addClass("hidden");
      if($(".nice-select li.selected").index() != 1){
        $("#deposit-scrollbox").removeClass("hidden");
      }
    }
  });
  $("#deposit-asset-select").on("change", function () {
    if ($(".toggle-button").is(":checked")) {
      //withdraw
    } else {
      //deposit
      if ($(".nice-select li.selected").index() == 1) {
        //ethereum selected

        $("#ssss1, #ssss2").removeClass("hidden");
        $("#deposit-scrollbox").addClass("hidden");

      } else if ($(".nice-select li.selected").index() == 2) {
        //nfy-eth selected

        $("#ssss1").addClass("hidden");
        $(".deposit-scroll-bar").removeClass("hidden");

        $("#deposit-scrollbox, #ssss2").removeClass("hidden");

      } else if ($(".nice-select li.selected").index() == 3) {
        //nfy selected

        $("#ssss2").addClass("hidden");
        $(".deposit-scroll-bar").removeClass("hidden");
        $("#deposit-scrollbox, #ssss2").removeClass("hidden");
      }
    }
  });

  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 300) {
      jQuery(".menu-container").addClass("hdr_fix");
      jQuery("header").addClass("header-is-fixed");
      jQuery("body").addClass("header-body-fixed");
    } else {
      jQuery(".menu-container").removeClass("hdr_fix");
      jQuery("body").removeClass("header-body-fixed");
    }
  });

  //}
});

