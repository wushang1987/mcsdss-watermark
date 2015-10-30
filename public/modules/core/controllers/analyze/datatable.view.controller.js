(function() {
  'use strict';

  angular
    .module('core')
    .controller('DatatableViewController', DatatableViewController);

  DatatableViewController.$inject = ['$scope', 'Authentication', '$filter', 'ngTableParams'];

  function DatatableViewController($scope, Authentication, $filter, ngTableParams) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.headerFilter = headerFilter;
    $scope.datasetOrder = datasetOrder;
    $scope.rowClicked = rowClicked;
    $scope.decorateSiblings = decorateSiblings;
    $scope.clearSiblings = clearSiblings;
    $scope.updateView = updateView;

    // $scope.headerdata = [];
    // $scope.tabledata = [];

    $scope.suf01 = 0;
    $scope.suf02 = 0;
    $scope.suf03 = 0;
    $scope.muf = 0;

    $scope.$on('analysisDataLoaded', function(event, args) {
      // console.log(event, args);
      // console.log('Datatable View receiving broadcast.');
      $scope.updateView(args);
    });

    function headerFilter(target) {
      return target.visible;
    }

    function datasetOrder(key) {
      // console.log(key);
      // console.log('key='+key);    //prints: 'key=undefined'

      angular.forEach($scope.headers, function(target) {
        // console.log('key='+key);
        if (target.data == key) {
          if (target.visible) {
            return target.order;
          }
        }
      });
      return -1;
    }

    function rowClicked(target) {
      console.log(event);
      // console.log('Dataset: ' + target.dataSource);
      // console.log(target);

      for (var key in target) {
        if (target.hasOwnProperty(key)) {
          console.log(key + " -> " + target[key]);
        }
      }
    }

    function decorateSiblings(target) {
      // console.log('data row touched, sending emission.');
      $scope.$emit('currentDatatableTarget', target);
    }

    function clearSiblings(target) {
      // console.log('datarow cleared, sending all clear.');
      $scope.$emit('clearDatatableTarget', target);
    }

    function updateView(data) {

      // ngTable
      /*
      $scope.dataTable = new ngTableParams({
        page: 1,
        count: 10
      }, {
        total: $scope.tabledata.length,
        counts: [10, 25, 50, 100, 250],
        defaultSort: 'asc',
        getData: function($defer, params) {
          $scope.data = params.sorting() ? $filter('orderBy')($scope.tabledata, params.orderBy()) : $scope.tabledata;
          $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
          $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
          $defer.resolve($scope.data);
          console.log($scope.data);
        }
      });
      */

      $scope.newdata = data;

      console.log($scope.newdata.length);  // 9383
      console.log($scope.newdata);
      console.log($scope.newdata[0]);

      $scope.headerdata = $scope.newdata[0];
      console.log($scope.headerdata.length); // 21
      console.log($scope.headerdata);
      // console.log($scope.headerdata[0]);

      $scope.tabledata = $scope.newdata.shift();
      console.log($scope.tabledata.length);  // 9382
      console.log($scope.tabledata);
      // console.log($scope.tabledata[0]);

      // $scope.$apply(function() { });
    }
  }
})();