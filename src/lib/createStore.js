export class CreateStore {
  constructor(initialState) {
    this.state = initialState;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  getState() {
    return this.state;
  }
}
