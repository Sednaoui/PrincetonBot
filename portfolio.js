function Portfolio(){
    this.keys = {};
    this.balance = 0;
    this.length = 0;
}

Portfolio.prototype.buy = function(name, price_bought, n){
    var price_n = [price_bought, n];
    this.balance = this.balance - (n*price_bought);
    this.keys[name] = price_n;
};


Portfolio.prototype.sell = function(name, price_sold, n_sold) {
    if (this.keys[name]){
        var price_n = this.keys[name]; // get old data and num of stocks
        var n = price_n[1]; // get old price

        n = n - n_sold; // update number of stocks
        price_n[1] = n;

        this.keys[name] = price_n;
        this.balance = this.balance + (n_sold * price_sold);
    }
};

Portfolio.prototype.log_portfolio = function() {
    console.log('logging')
    for (var key in this.keys){
        console.log(key, this.keys[key]);
    }
    console.log(this.balance);
};

exports.Portfolio = Portfolio;
module.exports = Portfolio;
