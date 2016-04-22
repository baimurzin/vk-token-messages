/**
 * Created by vlad on 22.04.2016.
 */
var vk = angular.module('vk', ['ngRoute']);

vk.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/chats', {
            templateUrl: 'app/parts/chats.html',
            controller: 'ChatController'
        })
        .when('/chat/:id', {
            templateUrl: 'app/parts/messages.html',
            controller: 'MessageController'
        })
});

Array.prototype.inArray = function(comparer) {
    for(var i=0; i < this.length; i++) {
        if(comparer(this[i])) return true;
    }
    return false;
};

// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element, comparer) {
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};