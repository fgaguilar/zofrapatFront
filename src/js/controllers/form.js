'use strict';

app.run(function($locale){
    $locale.NUMBER_FORMATS.GROUP_SEP = ",";
});


app.controller('FacturaExportacionCtrl',function ($scope,$location,$cookies,$state,$timeout,$stateParams,Factura) {
  console.log("Ingreso a FacturaExportacionCtrl");
  $scope.factura={};

  $scope.cancelar = function(){
    console.log("Ingreso a Cancelar");
    $state.go('app.dashboard-v1');
  };
  $scope.grabar = function() {
    console.log("Ingreso a Grabar");
    console.log($scope.factura);
    if ($scope.factura.fecha.getFullYear) {
      $scope.anio=$scope.factura.fecha.getFullYear();
    }
    else {
      $scope.anio=$scope.factura.fecha.substr(0, 4);
    }

    if ($scope.factura.fecha.getMonth) {
      $scope.mes=$scope.factura.fecha.getMonth()+1;
    }
    else {
      $scope.mes=$scope.factura.fecha.substr(5, 2);
    }

    if ($scope.factura.fecha.getDate) {
      $scope.dia=$scope.factura.fecha.getDate();
    }
    else {
      $scope.dia=$scope.factura.fecha.substr(8, 2);
    }
    $scope.miFecha = new Date($scope.anio,$scope.mes-1,$scope.dia);
    $scope.factura.fecha=$scope.miFecha; 
    Factura.save($scope.factura, function() {
      $timeout(function() {
        window.open($scope.url);
      });
    });
  };
});

app.controller('DosificacionesUpdateCtrl',function ($scope,$location,$timeout,$stateParams,$state,Dosificacion) {
  console.log("Ingreso a DosificacionesUpdateCtrl");
  var dosificacion=$stateParams.dosificacionId;
  console.log(dosificacion);
  $scope.planilla2={};
  $scope.dosificacion={};
  $scope.planilla2=Dosificacion.get({'dosificacionId': dosificacion}, function(datos){
    $scope.dosificacion=datos;
    $scope.fecha=datos.updated_at;
    $scope.cancelar = function(){
      console.log("Ingreso a Cancelar");
      $state.go('app.dashboard-v1');
    };    
    $scope.grabar = function() {
      console.log("Ingreso a Actualizar");
      console.log($scope.dosificacion.id);
      Dosificacion.update({dosificacionId: dosificacion}, $scope.dosificacion, function() {
          $timeout(function() {
            $scope.successTextAlert = "Dosificacion Actualizado";
            $scope.showSuccessAlert = true;
            $scope.switchBool = function (value) {
              $scope[value] = !$scope[value];
            };
            $state.go('app.billing.dosificacionesUpdate');
          });
      });
    };
  });  
});