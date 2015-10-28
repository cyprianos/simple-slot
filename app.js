var App = {
  start: function(){
    var canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.ajax('GET', 'config.json', true, this.setup, null, this);
    this.tpl = {};
  },
  setup: function(xhr) {

    var wrapper = document.getElementById('wrapper'),
      select = document.createElement('select'),
      option,
      slotImage,
      ctx = this.ctx,
      images,
      self = this;

    this.config = JSON.parse(xhr.responseText);
    images = this.config.images;
    images.forEach(function(item){
      option = document.createElement('option');
      option.value = item.name;
      option.textContent = item.id;
      select.appendChild(option);
    });


    select.onchange = function(e){
      // console.log(e.target.value);
      var selected = images.filter(function(item){
        // console.log(item);
        return e.target.value === item.id;
      });

      item = selected[0];
      self.render(item);
    }

    var slotImage = new Image();


    slotImage.onload = function(){
      self.render(images[0]);
    }
    slotImage.src = this.config.iconfile;

    this.slotImage = slotImage;

     // canvas test
    //  ctx.fillStyle = "rgb(200,0,0)";
    //  ctx.fillRect (10, 10, 55, 50);
     //
    //  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    //  ctx.fillRect (30, 30, 55, 50);

    wrapper.appendChild(select);

    var button = document.getElementById('button');
    button.onclick = function(e){
      var result;
      if(App.state === "bigwin") {
        result = "won :)";
      } else {
        result = "lose :(";
      }
      alert("You " + result);

    }

  },
  render: function(item) {
    App.state = item.id;
    App.ctx.drawImage(App.slotImage,item.x,item.y,500,500,0,0,500,500);
  },
  ajax: function(method, url, isAsync, cbSuccess, cbError, context) {
      var xmlhttp;

      if (window.XMLHttpRequest) {
          // code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp = new XMLHttpRequest();
      } else {
          // code for IE6, IE5
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {
             if(xmlhttp.status == 200){

                if(cbSuccess) {
                  cbSuccess.call(context, xmlhttp);
                }
             } else {
               if(cbError) {
                  cbError.call(context, xhmlhttp);
               }
             }
          }
      }

      xmlhttp.open(method, url, isAsync);
      xmlhttp.send();
  }

};


window.onload = function() {
  App.start();
};

/* modified version of http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery */

