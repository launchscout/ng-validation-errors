angular.module("validationErrors", []);

angular.module("validationErrors").provider("ErrorMessages", function() {
    // In the provider function, you cannot inject any
    // service or factory. This can only be done at the
    // "$get" method.

    this.errorMessages = {};

    this.$get = function() {
        var errorMessages = this.errorMessages;
        return {
            error: function(errorType) {
                return errorMessages[errorType] || errorType;
            }
        };
    };

    this.setErrorMessages = function(messages) {
        this.errorMessages = messages;
    };
});

angular.module("validationErrors").
  directive('validationErrors', function(ErrorMessages) {
    return {
      restrict: "A",
      scope: {
        errors: "=",
        errorClass: "@"
      },
      controller: function($scope) {
        $scope.errorFor = function(errKey) { return ErrorMessages.error(errKey);};
        $scope.buildErrorClass = function() { return this.errorClass || "inline-help text-error"; }
      },
      template: "<span ng-class='buildErrorClass()' ng-repeat='(errorKey, isError) in errors' ng-show='isError'>{{errorFor(errorKey)}}</span>"
    };
  });