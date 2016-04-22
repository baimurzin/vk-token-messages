/**
 * Created by vlad on 22.04.2016.
 */
vk
    .controller('ChatController', ChatController);
ChatController.$inject = ['$scope', '$http'];
//1d8a87a06c7f68828c47bc4bdac64cf10042bac5adc55dba38d6a6da34d50d484c541276c3e7f0f3950ba
//https://api.vk.com/method/
//callback=JSON_CALLBACK
function ChatController($scope, $http) {
    var _all = '';
    var _base = 'https://api.vk.com/method/';
    var _callback = 'callback=JSON_CALLBACK';
    var _token = '1d8a87a06c7f68828c47bc4bdac64cf10042bac5adc55dba38d6a6da34d50d484c541276c3e7f0f3950ba';
    $scope.users = [];
    var url = 'https://api.vk.com/method/messages.getDialogs?count=200&access_token=1d8a87a06c7f68828c47bc4bdac64cf10042bac5adc55dba38d6a6da34d50d484c541276c3e7f0f3950ba&callback=JSON_CALLBACK';

    $http.jsonp(url).success(function (data) {
        $scope.dialogs = data.response;
        var _users = [];
        data.response.forEach(function (el) {
            _users.push(el.uid);
        });
        _all = _users.join(', ');
        $scope.getUsers(_all);
    });

    $scope.getUsers = function (uid) {
        var url = _base + 'users.get?' + 'user_ids=' +uid + '&fields=photo_50&access_token=' + _token + '&' + _callback;
        $http.jsonp(url).success(function (data) {
            data.response.forEach(function (el) {
                $scope.users[el.uid] = el;
            });
        });
    }
}