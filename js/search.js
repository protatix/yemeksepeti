const Search = function(args) {
    this.term = args.term;
    this.cards = document.querySelectorAll('.card');
    this.products = document.querySelectorAll('.products');

    this.searchFunc = function() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].lastElementChild.children[0].innerText.toUpperCase().indexOf(this.term.toUpperCase()) >= 0) {
                this.cards[i].style.display = '';
                this.cards[i].parentElement.style.display = '';
            } else {
                this.cards[i].style.display = 'none';
                /*
                 * This.cards[i].parentNode.style.display = 'none'
                 * Console.log(this.cards[i].parentNode)
                 */
                this.getSibling(this.cards[i]);
            }
        }
    };

    this.getSibling = function(elem) {
        const siblings = [];
        let first = elem.parentNode.firstChild.nextElementSibling;

        while (first) {
            if (first.nodeType === 1) {
                siblings.push(first);
            }
            first = first.nextSibling;
        }

        function setVisibility(){
           return siblings.every(function(res) {
               return res.style.display == 'none';
           }) ? 'none' : '';
        }
        elem.parentNode.firstChild.style.display = setVisibility();
    };
    this.searchFunc();
};
