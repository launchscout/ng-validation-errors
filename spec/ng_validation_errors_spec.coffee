angular.module("testDirective", ["validationErrors"]).config (ErrorMessagesProvider) ->
  ErrorMessagesProvider.setErrorMessages
    required: "You need this"

describe "errorMessages directive", ->
  beforeEach ->
    module("testDirective")

  beforeEach inject( ($compile, $rootScope) ->
    @scope = $rootScope.$new()
    @compile = $compile
    @scope.errors =
      required: true
    @element = @compile("<div validation-errors errors='errors'></div>")(@scope);
    @scope.$digest()
  )

  it "should work", ->
    expect(@element.html()).toMatch /You need this/
    expect(@element.find("span").attr("class")).toMatch /error/

  context "with an error class specified", ->
    beforeEach ->
      @element = @compile("<div validation-errors errors='errors' error-class='stupid'></div>")(@scope);
      @scope.$digest()
    it "should add the error class specified", ->
      expect(@element.find("span").attr("class")).toMatch /stupid/

