// Generated by LiveScript 1.5.0
angular.module('unetworkExplorer').controller('addressInfoCtrl', function($rootScope, $scope, $location, $routeParams, $q){
  var web3, getAddressInfos;
  if ($routeParams.addressId == null) {
    return;
  }
  importAll$($scope, $routeParams);
  web3 = $rootScope.web3;
  getAddressInfos = function(cb){
    return web3.eth.getBalance($scope.addressId, function(err, balance){
      if (err != null) {
        return cb(err);
      }
      return web3.eth.getCode($scope.addressId, function(err, code){
        if (err != null) {
          return cb(err);
        }
        return web3.eth.getTransactionCount($scope.addressId, function(err, transactions){
          var balanceInEther;
          balanceInEther = web3.fromWei(balance, 'ether');
          return cb(null, {
            balance: balance,
            balanceInEther: balanceInEther,
            code: code,
            transactions: transactions
          });
        });
      });
    });
  };
  return getAddressInfos(function(err, res){
    if (err != null) {
      return alert(err);
    }
    console.log(res);
    return $scope.$apply(function(){
      return importAll$($scope, res);
    });
  });

  function importAll$(obj, src){
    for (var key in src) obj[key] = src[key];
    return obj;
  }


});

