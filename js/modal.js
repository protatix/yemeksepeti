function Modal() {
   this.checkout = document.querySelector('.checkout');
   this.totalPrice = document.querySelector('.total');
   this.button = document.querySelectorAll('#myBtn');
   this.modal = null;
   this.price = null;
   this.count = null;
   this.finalPrice = 0;
   var that = this;
   //SPAN CLOSE
   this.span = document.createElement('span');
   this.span.setAttribute('class', 'close');
   this.span.innerHTML = '&times;';

   //SEPETE EKLE BUTON
   this.add = document.createElement('input');
   this.add.setAttribute('type', 'submit');
   this.add.setAttribute('value', 'Sepete Ekle');

   //INPUT ADD
   this.inputCount = document.createElement('input');
   this.inputCount.setAttribute('type', 'number');
   this.inputCount.setAttribute('min', '1');
   this.inputCount.setAttribute('max', '50');
   this.inputCount.setAttribute('step', '1');
   this.inputCount.setAttribute('value', '1');

   //MODAL CREATE
   this.createModal = function (btn) {
      this.modal = document.createElement('div');
      this.modal.setAttribute('class', 'modal');
      this.modal.setAttribute('id', 'myModal');
      this.modal.innerHTML = '<div class="modal-content"><div class="modal-order"><h1>Ürün :  ' + btn.parentNode.firstElementChild.innerText + '</h1><p>Yemek Açıklaması : ' + btn.previousElementSibling.previousElementSibling.innerText + '</p><p>Fiyat : ' + btn.previousElementSibling.innerText + '</p></div></div></div>';
      this.modal.children[0].insertBefore(this.span, this.modal.children[0].childNodes[0]);
      this.modal.children[0].children[1].insertBefore(this.inputCount, this.modal.children[0].children[1].firstElementChild);
      this.modal.children[0].children[1].insertBefore(this.add, this.modal.children[0].children[1].childNodes[this.modal.children[0].children[1].childElementCount]);
      document.body.appendChild(this.modal);
   }

   //BUTTONS CLICK OPEN MODAL
   for (var i = 0; i < this.button.length; i++)(function (i) {
      that.button[i].onclick = function () {
         that.createModal(that.button[i]);
         that.modal.style.display = "block";
      }
   })(i);

   // CLOSE OTHER CLICK
   window.onclick = function (event) {
      if (event.target == that.modal) {
         that.modal.parentNode.removeChild(that.modal);
      }
   }

   //CLOSE BUTTON
   this.span.onclick = function () {
      that.modal.parentNode.removeChild(that.modal);
   }

   //SEPETE EKLE CLICK
   this.add.onclick = function () {
      that.count = that.inputCount.value;
      //DONT TAKE THE NEGATIVE VALUE
      if (that.count >= 1) {
         that.price = parseFloat(that.modal.children[0].lastChild.children[3].innerText.split(' ')[2].replace(",", "."));
         that.modal.parentNode.removeChild(that.modal);
         var addCheckout = document.createElement('span');
         addCheckout.setAttribute('class', 'price');
         addCheckout.innerHTML =  '<hr>' + that.modal.firstElementChild.lastElementChild.children[1].innerText.split(":")[1] + " - " + that.price + " TRY, <b>"+ that.count +" adet</b>";
         that.checkout.appendChild(addCheckout);
         that.totalPrice.innerHTML = '<p>Toplam <span class="price" style="color:black"><b>'+ (that.finalPrice += that.price * that.count) + ' TRY</b></span></p>';
         //RESET INPUT
         that.inputCount.value = 1;
      }
   }
}