import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="hai"
export default class extends Controller {
  static targets = ["name", "output"]

  greet() {
    this.outputTarget.textContent = `Hello, ${this.nameTarget.value}!`
  }
}
