import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="counter"
export default class extends Controller {
  static targets = ["count"]

  connect() {
    this.count = parseInt(this.countTarget.textContent) || 0
  }

  increase(){
    this.count++
    this.updateCount()
  }

  decrease(){
    this.count--
    this.updateCount()
  }

  updateCount(){
    this.countTarget.textContent = this.count
    
  }
}
