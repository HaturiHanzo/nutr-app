'use strict';

angular
    .module('nutr')
    .factory('nwGui', ['nutrConfiguration', function (config) {
        var gui = require('nw.gui'),
            win = gui.Window.get();
        return {
            /**
             * Gui instance getter
             *
             * @returns {Object}
             */
            getGui: function () {
                return gui;
            },

            /**
             * Gui window getter
             *
             * @returns {Object}
             */
            getGuiWindow: function () {
                return win;
            },

            /**
             * Initializes gui window
             *
             */
            initialize: function () {
                win.resizeTo(config.width, config.height);
                if (config.enviroment === 'development') {
                    win.showDevTools();
                }
            }
        }
    }]);