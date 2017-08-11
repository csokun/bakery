const bakery = {
    template: `
    <h1>Order</h1>

    <div class="ui grid">
        <div class="eight wide column">
            <div class="ui segments">
                <div class="ui segment">
                    <form class="ui form">
                        <div class="field" ng-repeat="order in $ctrl.orders">
                            <label>[ {{order.code}} ] {{order.name}}</lable> 
                            <input type="number" min="0" ng-model="order.qty" />
                        </div>
                    </form>
                </div>
                <div class="ui segment">
                    <button type="button" ng-click="$ctrl.submitOrders()" class="ui button primary">Order Now</button>
                </div>
            </div>
        </div>

        <div class="eight wide column">
            <div class="ui segment">
                <div ng-repeat="rs in $ctrl.orderResults">
                    <h4>{{rs.order.qty}} {{rs.order.code}} = {{rs.order.total | currency}}</h4> 
                    <div class="ui red horizontal label" ng-if="rs.error" style="margin-bottom: 10px;">{{rs.error}}</div>
                    <ul ng-if="!rs.error">
                        <li ng-repeat="item in rs.result">{{item.unit}} x {{item.qty}} {{item.price | currency}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `,
    controller: function ($http) {
        this.orders = [];
        this.orderResults = [];

        this.$onInit = function () {
            $http.get('/orders/products').then(result => {
                this.orders = (result.data || []).map(item => {
                    return {
                        code: item.code,
                        name: item.name,
                        qty: 0
                    };
                });
            });
        };

        this.submitOrders = function () {
            let orders = this.orders.filter(order => order.qty > 0).map( order => {
                return { code: order.code, qty: order.qty };
            });

            this.orderResults = [];
            $http.post('/orders', JSON.stringify({ orders }))
                .then(result => {
                    let data = result.data;
                    this.orderResults = data;
                })
        }
    }
};

// angular app initialization
angular
    .module('bakery', [])
    .component('bakery', bakery)
    .config(function($compileProvider) {
        
    });

// load app
angular.bootstrap(document.documentElement, ['bakery']);