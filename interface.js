$(document).ready(function(){
    var rows = 8;
    var generateGrid = function(cols){
      $("#grid").empty();
      for (i=0;i<rows;i++){
        $("#grid").append("<ul>");
        for (j=0;j<cols;j++){
          $("#grid ul:last-of-type").append('<li class="target"></li>');
        }
        $("#grid").append("</ul>")
      }
      var $gridNodes = $("#grid li");
      $gridNodes.width( 100/cols + "%" );
      $(".one").width( $gridNodes.width() - 16 );
      $(".two").width( $gridNodes.width() * 2 - 16 );
    }
    generateGrid(units);
    function place() {
      var grid = $('#grid .target');
      var blocks = $('.pep');
      var snap = grid[0];
      for(i=0;i<grid.length;i++){
        grid[i].distance = Math.sqrt(Math.pow(grid[i].offsetLeft-$('.pep-active').offset().left, 2) + Math.pow(grid[i].offsetTop-$('.pep-active').offset().top, 2));
        if(snap.distance >= grid[i].distance && grid[i].getAttribute("data-switch") != "active"){
          snap = grid[i];
          $('.pep-active').attr("data-location", i);
        }
      }
      for(i=0;i<grid.length;i++){

      }
      snap.setAttribute("data-switch", "active");
      $('.pep-active').offset({top:snap.offsetTop,left:snap.offsetLeft});
    }
    $('.pep').pep({
      activeClass: 'pep-active',
      stop: place,
      shouldEase: false
    });
  });