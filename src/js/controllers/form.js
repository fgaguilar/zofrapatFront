'use strict';

app.run(function($locale){
    $locale.NUMBER_FORMATS.GROUP_SEP = ",";
});


app.controller('FacturaExportacionCtrl',function ($scope,$location,$cookies,$state,$timeout,$stateParams,Factura,Dosificacion) {
  console.log("Ingreso a FacturaExportacionCtrl");
  var planillaId = $stateParams.planId;
  $scope.factura={};

  $scope.dosificacion2={};
  $scope.dosificacion2= Dosificacion.get({'dosificacionId': 1}, function(datos2){
    $scope.factura.factura=datos2.numero;
  }); 

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
    console.log("Antes de factura.save!!!!!!");
    Factura.save($scope.factura, function() {
      console.log("Ingreso a SAVE");
      console.log($scope.factura);
      $timeout(function() {
        console.log("Ingreso a timeout");
        $scope.url="http://mscwsus.minera.local:8080/birt/frameset?__report=reportes/factura3.rptdesign&factura=" + $scope.factura.factura + 
        "&qr=http://mscwsus.minera.local:8081/zofrapatback/public/" + $scope.factura.factura +".png";
        window.open($scope.url);
        //$state.go('app.dashboard-v1');
      });
    });
  };

  $scope.calcular = function(){
      console.log('Ingreso a Calcular!!!');
      //$scope.factura.montot1=$scope.factura.cantidad1*$scope.factura.monto1;
      //$scope.factura.montot2=$scope.factura.cantidad2*$scope.factura.monto2;
      //$scope.factura.montot=($scope.factura.montot1+$scope.factura.montot2);
      return "";
    };

    $scope.imprimir = function() {  
    console.log($scope.factura);
        $scope.url="http://mscwsus.minera.local:8080/birt/frameset?__report=reportes/factura3.rptdesign&factura=" + $scope.factura.factura + 
        "&qr=http://mscwsus.minera.local:8081/zofrapatback/public/" + $scope.factura.factura +".png";
        window.open($scope.url);  
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