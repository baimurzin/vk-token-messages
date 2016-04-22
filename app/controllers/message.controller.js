/**
 * Created by vlad on 22.04.2016.
 */
vk
    .controller('MessageController', MessageController);
MessageController.$inject = ['$scope', '$http', '$routeParams'];

function MessageController($scope, $http, $routeParams) {
    $scope.users = [];

    var _all = '';
    var _base = 'https://api.vk.com/method/';
    var _callback = 'callback=JSON_CALLBACK';
    var _token = '1d8a87a06c7f68828c47bc4bdac64cf10042bac5adc55dba38d6a6da34d50d484c541276c3e7f0f3950ba';
    var cid = $routeParams.id;
    $scope.cid = cid;
    var url = 'https://api.vk.com/method/messages.getHistory?user_id=' + cid + '&count=30&access_token=1d8a87a06c7f68828c47bc4bdac64cf10042bac5adc55dba38d6a6da34d50d484c541276c3e7f0f3950ba&callback=JSON_CALLBACK';

    $scope.companion = {};

    $http.jsonp(url).success(function (data) {
        $scope.messages = data.response;
        //console.log($scope.messages);
        var _users = [];
        data.response.forEach(function (el) {
            if (jQuery.inArray(el.uid, _users) < 0) {
                console.log(222);
                _users.push(el.uid);
            }
            if (jQuery.inArray(el.from_id, _users) < 0) {
                _users.push(el.from_id);
            }
        });
        _all = _users.join(', ');
        $scope.getUsers(_all);

    });

    var offset = 29;

    $scope.getMore = function () {
        var url = 'https://api.vk.com/method/messages.getHistory?user_id=' + cid + '&offset='+offset+'&count=20&access_token=1d8a87a06c7f68828c47bc4bdac64cf10042bac5adc55dba38d6a6da34d50d484c541276c3e7f0f3950ba&callback=JSON_CALLBACK';
        offset += 19;
        $http.jsonp(url).success(function (data) {
            $scope.messages =data.response;
            //$scope.messages = $scope.messages.concat(data.response);
            var _users = [];
            data.response.forEach(function (el) {
                _users.push(el.uid);
                _users.push(el.from_id);
            });
            _all = _users.join(', ');
            $scope.getUsers(_all);
            console.log($scope.messages);
        });
    };

    $scope.getUsers = function (uid) {
        var url = _base + 'users.get?' + 'user_ids=' + uid + '&fields=photo_50&access_token=' + _token + '&' + _callback;
        $http.jsonp(url).success(function (data) {
            data.response.forEach(function (el) {
                $scope.users[el.uid] = el;
            });
        });
    }
}