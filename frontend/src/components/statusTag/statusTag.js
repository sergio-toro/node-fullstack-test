import './statusTag.css'

export default {
  template: `
    <div class="status-tag" ng-switch on="$ctrl.status">
      <span ng-switch-when="processed">
        <i class="fa fa-fw fa-check" aria-hidden="true"></i> Processed
      </span>
      <span ng-switch-when="processing">
        <i class="fa fa-fw fa-repeat" aria-hidden="true"></i> Processing
      </span>
      <span ng-switch-default>
        <i class="fa fa-fw fa-clock-o" aria-hidden="true"></i> In Queue
      </span>
    </div>
  `,
  bindings: {
    status: '='
  }
}
