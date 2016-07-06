webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var browser_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(228);
	var router_1 = __webpack_require__(243);
	var app_1 = __webpack_require__(273);
	browser_1.bootstrap(app_1.MyApp, http_1.HTTP_PROVIDERS.concat(router_1.ROUTER_PROVIDERS)).catch(function (console) { return console.error(console); });


/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(23);
	var router_1 = __webpack_require__(243);
	var home_1 = __webpack_require__(274);
	var about_1 = __webpack_require__(275);
	var MyApp = (function () {
	    function MyApp() {
	    }
	    MyApp = __decorate([
	        core_1.Component({
	            selector: 'my-app',
	            directives: [router_1.ROUTER_DIRECTIVES],
	            template: "\n    <h1>Basic Webpack Starter</h1>\n    <div>\n      <a [routerLink]=\"['/Home']\">Home</a>\n      <a [routerLink]=\"['/About']\">About</a>\n    </div>\n    <div>\n      <router-outlet></router-outlet>\n    </div>\n  "
	        }),
	        router_1.RouteConfig([
	            new router_1.Route({ path: '/', component: home_1.Home, name: 'Home' }),
	            new router_1.Route({ path: '/about', component: about_1.About, name: 'About' })
	        ]), 
	        __metadata('design:paramtypes', [])
	    ], MyApp);
	    return MyApp;
	})();
	exports.MyApp = MyApp;


/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(23);
	var Home = (function () {
	    function Home() {
	        console.log("In Home constructor");
	    }
	    Home = __decorate([
	        core_1.Component({
	            selector: 'my-home',
	            template: "\n    <h2>Home Component</h2>\n    <p>Welcome to the Angular Webpack Starter project!</p>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Home);
	    return Home;
	})();
	exports.Home = Home;


/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(23);
	var About = (function () {
	    function About() {
	    }
	    About = __decorate([
	        core_1.Component({
	            selector: 'my-about',
	            template: "\n    <h2>About Component</h2>\n    <p>This is the about component</p>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], About);
	    return About;
	})();
	exports.About = About;


/***/ }

});
//# sourceMappingURL=bundle.js.map