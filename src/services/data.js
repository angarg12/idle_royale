angular
.module('incremental')
.service('data',
[
function() {  
  this.save;
  
  this.start_save = {
    scripts: {
      1:"",
      2:"",
      3:"",
      4:"",
      5:""
    },
    rounds: {
      'Bot': {
        wins: 0,
        record: undefined
      }
    }
  };
  
  
}]);