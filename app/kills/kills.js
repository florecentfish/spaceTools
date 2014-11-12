(function() {
    'use strict';

    var moduleName = 'space-tools.kills',

        angularDependencies = [];

    define([
        'require',
        'angular'
    ], function(require, angular) {

        var module = angular.module(moduleName, angularDependencies);

        function LossesCtrl($scope, $http, $q) {

            var loadKills = $http.get('https://zkillboard.com/api/losses/no-attackers/allianceID/1354830081/'),
                loadTypeNames = $http.get('app/assets/invTypeNames.json');

            // Using $q.all we can wait until all of the data is loaded before
            // setting it on this controller.
            // We wait untill all data is loaded so that the template doesn't render too early
            $q.all({
                loadKills: loadKills,
                loadTypeNames: loadTypeNames
            }).then(function(results) {

                var kills = results.loadKills.data,
                    typeNames = results.loadTypeNames.data;

                for (var i = kills; i >= 0; i++) {
                    kill.victimShipName = typeNames[kill.victim.shipTypeID].name;
                };

                console.log(kills);
                console.log(typeNames);

                this.kills = kills;
                this.typeNames = typeNames;

            }.bind(this));

        }

        console.log('i was loaded!');

        module.controller('LossesCtrl', ['$scope', '$http', '$q', LossesCtrl]);

        return module;
    });
})();