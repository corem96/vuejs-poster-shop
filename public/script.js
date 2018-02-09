new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { 
                id: 1,
                title: 'Poster A',
                price: 5.50
            },
            { 
                id: 2,
                title: 'Poster B',
                price: 10
            },
            { 
                id: 3,
                title: 'Poster C',
                price: 7.50
            }
        ],
        cart: [],
        search: ''
    },
    methods: {
        onSubmit: function() {
            console.log(this.search);
        },
        addItem: function(index) {
            let item = this.items[index];
            let found = false;
            
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].qty++;
                    found = true;
                }
            }
            
            if(!found){
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    qty: 1
                });
            }
            
            this.total += item.price;
        },

        inc: function(item) {
            item.qty++;
            this.total += item.price;
        },

        dec: function(item) {
            item.qty--;
            this.total -= item.price;
            if (item.qty <= 0) {
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        },
    },
    filters: {
        currency: function(price) {
            return '$' . concat(price.toFixed(2));
        }
    }
});