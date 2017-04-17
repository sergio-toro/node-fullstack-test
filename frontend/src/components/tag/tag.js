import './tag.css';

export default {
  template: `
    <span class="tag">
      {{$ctrl.content}}
    </span>
  `,
  bindings: {
    content: '='
  }
}
