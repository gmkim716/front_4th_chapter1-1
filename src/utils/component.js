export class Component {
  constructor() {
    this.router = null;
  }

  render(template) {
    return (document.getElementById("root").innerHTML = template);
  }

  setRouter(router) {
    this.router = router;
  }
}
