// Start server: npm run start

var PRICE = 9.90;
var LOAD_NUM = 10;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        results: [],
        search: 'landscape',
        lastSearch: '',
        loading: false,
        price: PRICE
    },
    methods: {
        appendItems: function(){
            if(this.items.length > this.results.length) {
                var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
                this.items = this.items.concat(append);
            }
        },
        onSubmit: function() {
            this.items = [];
            this.loading = true;
            this.$http
                .get('/search/'.concat(this.search))
                .then(function(res){
                    this.lastSearch = this.search;
                    this.results = res.data;
                    this.items = res.data.slice(0, LOAD_NUM);
                    this.appendItems();
                    this.loading = false;
                });
        },
        addItem: function(index) {
            this.total += PRICE;
            var item = this.items[index];
            var found = false;
            
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].qty++;
                    found = true;
                }
            }
            
            if(!found){
                
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: PRICE,
                    qty: 1
                });
            }
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
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function() {
        this.onSubmit();

        var vueInstance = this;
        var elem = document.getElementById('product-list-bottom');
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function () {
            vueInstance.appendItems();
        });
    }
});