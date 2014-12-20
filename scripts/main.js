(function(w,d) {

  $(".nav-activate").click(function() {
    $("header").toggleClass("active");
  });

  $(".tour-button").click(function() {
    $(".tour").toggleClass("active"); 
  });

})(window, document);
