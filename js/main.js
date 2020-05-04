/*
  @class Model
  * Manages the data
  */
class Model {
  constructor() {
    this.data = [
      {
        id: 1,
        price: 30,
        count: 1,
        text: "Kuru Köfte & Pilav",
        imagePath:
          "https://galeri12.uludagsozluk.com/571/pilav-kofte-patates-kizartmasi_789207.jpg",
      },
      {
        id: 2,
        price: 25,
        count: 1,
        text: "Beşamel Soslu Tavuk",
        imagePath:
          "https://cdn.ye-mek.net/App_UI/Img/out/650/2016/12/firinda-etimekli-besamel-soslu-tavuk-resimli-yemek-tarifi(19).jpg",
      },
      {
        id: 3,
        price: 32,
        count: 1,
        text: "Vejetaryen Noodle",
        imagePath:
          "https://www.tazesef.com/image/catalog/Tarifler/18.42.v.v2.5.jpg",
      },
      {
        id: 4,
        price: 35,
        count: 1,
        text: "Penne All Arrabbiata",
        imagePath:
          "https://gbc-cdn-public-media.azureedge.net/img72638.768x512.jpg",
      },
      {
        id: 5,
        price: 28,
        count: 1,
        text: "Tagliatelle Bologna",
        imagePath:
          "https://res.cloudinary.com/hksqkdlah/image/upload/v1481145070/33125_sfs-tagliatelle-bolognese-sauce-83.jpg",
      },
      {
        id: 6,
        price: 40,
        count: 1,
        text: "Antrikot Izgara",
        imagePath:
          "https://iasbh.tmgrup.com.tr/178a5f/812/467/0/11/430/258?u=http://i.tmgrup.com.tr/sfr/2012/02/13/430x270/571693497922.jpg",
      },
    ];
    this.checkoutItems = JSON.parse(localStorage.getItem("checkout")) || [];
  }

  filterSearch(callback) {
    const result = this.data.filter((data) => {
      if (data.text.toUpperCase().includes(callback)) {
        return data;
      }
    });
    this.filterTerm = result;
  }

  bindCheckoutChanged(callback) {
    this.onCheckoutChanged = callback;
  }

  _commitItems(items) {
    this.onCheckoutChanged(items);
    localStorage.setItem("checkout", JSON.stringify(items));
  }

  addCheckout(menuId) {
    const item = this.data.find((item) => item.id == menuId);
    const index = this.checkoutItems.indexOf(item);
    if (index !== -1) {
      this.checkoutItems[index].count += 1;
    } else {
      this.checkoutItems.push(item);
    }

    this._commitItems(this.checkoutItems);
  }

  removeCheckout(menuId) {
    const deletedItem = this.checkoutItems.find(
      (items) => items.id === Number(menuId)
    );
    let index = this.checkoutItems.indexOf(deletedItem);
    if (deletedItem.count > 1) {
      this.checkoutItems[index].count -= 1;
    } else {
      this.checkoutItems.splice(index, 1);
    }
    this._commitItems(this.checkoutItems);
  }
}

/*
  @class View
  * View of page
  */

class View {
  constructor() {
    //Root Element
    this.app = this.getElement("#root");

    //Create a logo
    this.logoContainer = this.createElement("div", "logo-container");
    this.logo = this.createElement("a", "", "./index.html");
    this.logoImg = this.createImage("", "./img/logo.png", "Logo");
    this.logo.append(this.logoImg);
    this.logoContainer.append(this.logo);

    //Create Search Bar
    this.search = this.createElement("div", "search");
    this.input = this.createElement("input");
    this.search.append(
      this.setAttrElement(this.input, "placeholder", "Search...")
    );

    //Create title
    this.menuTitle = this.createElement("h1");
    this.menuTitle.textContent = "MENUS";

    this.checkoutTitle = this.createElement("h1");
    this.checkoutTitle.textContent = "CHECKOUT";

    //Create a body
    this.body = this.createElement("div", "body");

    //Create left of body
    this.bodyLeft = this.createElement("div", "body-left");
    this.bodyLeft.append(this.menuTitle);

    //Create right of body
    this.bodyRight = this.createElement("div", "body-right");

    this.totalPrice = this.createElement("div", "total");
    this.priceText = this.createElement("p", "priceText");
    this.priceText.textContent = "Total Price is : 0 TRY";
    this.totalPrice.append(this.priceText);

    this.bodyRight.append(this.checkoutTitle, this.totalPrice);

    //Append with together
    this.body.append(this.bodyLeft, this.bodyRight);

    //Grid
    this.gridContainer = this.createElement("div", "gridContainer");

    this.bodyLeft.append(this.gridContainer);

    //Append all elements
    this.app.append(this.logoContainer, this.search, this.body);
  }

  //Create an image tag
  createImage(className, src, alt) {
    const element = document.createElement("img");
    if (className) element.classList.add(className);
    if (alt) element.setAttribute("alt", alt);
    element.setAttribute("src", src);
    return element;
  }

  //Create an element with CSS Class and href
  createElement(tag, className, href) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (href) element.setAttribute("href", href);
    return element;
  }

  //Set a spesific attribute
  setAttrElement(element, attr, value) {
    element.setAttribute(attr, value);
    return element;
  }

  //Invoke DOM
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  getElements(selector) {
    const elements = document.querySelectorAll(selector);
    return elements;
  }

  //Display on frontend all data
  displayMenu(menus) {
    const gridContainer = this.getElement(".gridContainer");
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }

    if (menus.length === 0) {
      const noProduct = this.createElement("p");
      noProduct.textContent = "Couldn't find a menu";
      this.gridContainer.append(noProduct);
    }

    menus.map((menu) => {
      //Create a Card Body
      const card = this.createElement("div", "card");
      const imgMenu = this.createImage("imgMenu", menu.imagePath, "Menu");
      const menuContainer = this.createElement("div", "container");

      const foodTitle = this.createElement("h4");
      foodTitle.textContent = menu.text;

      const foodPrice = this.createElement("p");
      foodPrice.textContent = `${menu.price} TRY`;

      const buyBtn = this.createElement("button");
      buyBtn.setAttribute("class", "add-btn");
      buyBtn.textContent = "Buy Now";

      //Append to each other
      menuContainer.append(
        foodTitle,
        foodPrice,
        this.setAttrElement(buyBtn, "id", menu.id)
      );
      card.append(imgMenu, menuContainer);

      //Conect to our grid container
      this.gridContainer.append(card);
    });
  }

  displayCheckout(menus) {
    const totalDom = this.getElement(".total");
    let totalPrice = 0;
    while (totalDom.firstChild) {
      totalDom.removeChild(totalDom.firstChild);
    }

    menus.map((menu) => {
      const item = this.createElement("p");
      const deleteBtn = this.createElement("button", "deleteBtn");
      deleteBtn.setAttribute("class", "delete-btn");
      deleteBtn.textContent = "Delete";

      item.textContent = `${menu.count} X ${menu.text}, Price: ${menu.price} TRY`;
      totalPrice += menu.count * menu.price;
      item.append(this.setAttrElement(deleteBtn, "id", menu.id));
      totalDom.append(item);
    });

    const totalText = this.createElement("b");
    totalText.textContent = `Total Price: ${totalPrice} TRY`;
    totalDom.append(totalText);
  }

  bindAddCheckout(handler) {
    const buttons = this.getElements(".add-btn");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", (event) => {
        handler(event.target.id);
      });
    }
  }

  bindDeletedCheckout(handler) {
    const buttons = this.getElements(".delete-btn");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", (event) => {
        handler(event.target.id);
      });
    }
  }

  bindSearch(handler) {
    const input = this.getElement("input");
    input.addEventListener("keyup", (event) => {
      handler(event);
    });
  }
}

/*
  @class Controller
  *
  *@param model
  *
  *@param view
  *
  */

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    //Display views
    this.view.displayMenu(this.model.data);
    this.view.displayCheckout(this.model.checkoutItems);

    //Bind add and delete checkout items
    this.model.bindCheckoutChanged(this.onCheckoutChanged);
    this.view.bindAddCheckout(this.handleAddCheckout);
    this.view.bindDeletedCheckout(this.handleDeleteCheckout);
    this.view.bindSearch(this.handleSearch);
  }

  handleAddCheckout = (id) => {
    this.model.addCheckout(id);
  };

  handleDeleteCheckout = (id) => {
    this.model.removeCheckout(id);
  };

  handleSearch = (e) => {
    this.model.filterSearch(e.target.value.toUpperCase());
    this.view.displayMenu(this.model.filterTerm);
    this.view.bindAddCheckout(this.handleAddCheckout);
  };

  onCheckoutChanged = (items) => {
    this.view.displayCheckout(items);
    this.view.bindDeletedCheckout(this.handleDeleteCheckout);
  };
}

const app = new Controller(new Model(), new View());
