var Menu = function (args) {
   //ES5 CLASS
   this.menu = args;
   this.div = null;

   this.getCount = function() {
      return this.menu.length;
   }  
}

 //TUM MENULER VE DIV
 Menu.prototype.createProducts = function(dom) {
    for (let i = 0; i < this.getCount(); i++) {
      this.div = document.createElement('div');
      this.div.setAttribute('class', 'products');
      if (this.menu[i].Products.length > 0 ) {
         this.div.innerHTML = '<h1>' + this.menu[i].CategoryDisplayName  + '</h1>';
         this.createFood(this.menu[i].Products);
      }
      dom.appendChild(this.div);
    }
 }

//YEMEKLERI ILGILI DIV'E EKLE
 Menu.prototype.createFood = function(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.div.innerHTML += '<div class="card"><img src="../img/none.jpg" alt="Yemek" style="width:100%"><div class="container"><h4><b>' + arr[i].DisplayName  + '</b></h4><p style="display:none">' + arr[i].Description  + '</p><p>' + arr[i].ListPrice + ' TRY</p><button id="myBtn">Satın Al</button></div></div>';
    }
 }
