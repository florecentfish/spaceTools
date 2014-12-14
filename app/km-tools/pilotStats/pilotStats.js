/**
 * Created by skessler on 12/11/14.
 */

(function() {
    'use strict';
    var moduleName = 'space-tools.km-tools.pilotStats',
        angularDependencies = ['ui.router'];
    define([
        'require',
        'angular'
    ], function(require, angular, uirouter) {
        var module = angular.module(moduleName, angularDependencies);

        module.directive('pilotStats', function() {
            return {
                templateUrl: require.toUrl('./_pilotStats.html'),
                controller: function($scope) {
                    this.pilot;
                }
            }
        })
        return module;
    });
})();
