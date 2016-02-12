'use strict';

app.factory('Dosificacion', ['$resource',
  function($resource){
    return $resource('http://mscwsus.minera.local:8081/zofrapatBack/public/index.php/api/dosificaciones/:dosificacionId', {}, {
      'get': {method:'GET', params:{dosificacionId:'@dosificacionId'}, isArray:false},
      'save': {method:'POST'},
      'query': {method:'GET', isArray:true},
      'update': {method:'PUT'},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
    });
  }]);

app.factory('Factura', ['$resource',
  function($resource){
    return $resource('http://mscwsus.minera.local:8081/zofrapatBack/public/index.php/api/facturas/:facturaId', {}, {
      'get': {method:'GET', params:{facturaId:'@facturaId'}, isArray:false},
      'save': {method:'POST'},
      'query': {method:'GET', isArray:true},
      'update': {method:'PUT'},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
    });
  }]);

