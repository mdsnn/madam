import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["toggle"]
  
  connect() {
    // Set up the initial theme state
    this.initializeTheme()
    
    // Listen for system preference changes
    this.setupSystemPreferenceListener()
  }
  
  initializeTheme() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme")
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      this.updateToggleState(true)
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark")
      this.updateToggleState(false)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      this.applyTheme(prefersDark ? "dark" : "light")
    }
  }
  
  setupSystemPreferenceListener() {
    // Only apply system preference changes if user hasn't set a preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      if (!localStorage.getItem("theme")) {
        this.applyTheme(e.matches ? "dark" : "light")
      }
    })
  }
  
  toggle() {
    const isDark = document.documentElement.classList.contains("dark")
    this.applyTheme(isDark ? "light" : "dark")
  }
  
  applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      this.updateToggleState(true)
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      this.updateToggleState(false)
    }
  }
  
  updateToggleState(isDark) {
    if (this.hasToggleTarget) {
      this.toggleTarget.checked = isDark
    }
  }
}
