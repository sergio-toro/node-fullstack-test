import angular from 'angular';

import 'normalize'
import 'flexboxgrid'
import 'fontawesome'
import 'app.css'

import statusTag from './components/statusTag/statusTag'
import tag from './components/tag/tag'

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    // this.footer = `Let's start :D`;
  }
}

const MODULE_NAME = 'app'

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .component('statusTag', statusTag)
  .component('tag', tag)

export default MODULE_NAME
