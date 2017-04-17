import './flashMessage.css'

export default {
  template: `
    <div class="flash-message">
      <div class="flash-message-icon" ng-if="$ctrl.icon">
        <i class="fa fa-fw fa-{{$ctrl.icon}}" aria-hidden="true"></i>
      </div>
      <div class="flash-message-content">
        {{$ctrl.content}}
      </div>
    </div>
  `,
  bindings: {
    icon: '=',
    content: '=',
  }
}
