'use strict';
var app = angular
    .module('app', ['ngAnimate','ui.bootstrap', 'ngMap', 'ngTouch', 'angular-parallax', 'duScroll', 'angulartics', 'angulartics.google.analytics'])

    .controller('gralCtrl', [ '$scope', '$uibModal',
      function($scope, $uibModal) {

        $scope.open = function (size) {
        var modalInstance = $uibModal.open({
          templateUrl: 'modalTemplate',
          controller: 'ModalInstanceCtrl',
          size: 'lg'
        });

        }
      }
    ])

    .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance',

      function ($scope, $uibModalInstance) {
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }

    ])
    
    .controller('ContactCtrl', ['$scope', '$http',
      function ($scope, $http) {

        $scope.sending = false;

        $scope.sendTheMail = function() {
          $scope.sending = true;
          var name = $scope.name;
          var email = $scope.email;
          var message = $scope.message;

          var apiURL = 'https://mandrillapp.com/api/1.0/messages/send.json';
          var emailBody = 'From: '+name+'<br>'+email+'<br>Message:<br><br>'+message;

          var params = {
            'key': 'mandrillappKey',
            'message': {
              'from_email':email,
              'to':[{'email':'sabinovelasquez@gmail.com'}],
              'subject': 'Formulario Alto Cascabeles',
              'html': emailBody
            }
          };

          $http.post(apiURL, params).
            success(function (data, status, headers, config) {
              console.log(status);
              $scope.sending = false;
            }).
            error( function (data, status, headers, config) {
              console.log(status);
              $scope.sending = false;
          });

        };
      }

    ]);
