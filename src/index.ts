import { Controller } from "@hotwired/stimulus"

export default class CheckboxSelectAll extends Controller {
  hasCheckboxAllTarget: boolean
  checkboxTargets: HTMLInputElement[]
  checkboxAllTargets: HTMLInputElement[]

  static targets: string[] = ["checkboxAll", "checkbox"]

  initialize() {
    this.toggle = this.toggle.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  checkboxAllTargetConnected(checkbox: HTMLInputElement): void {
    checkbox.addEventListener("change", this.toggle)

    this.refresh()
  }

  checkboxTargetConnected(checkbox: HTMLInputElement): void {
    checkbox.addEventListener("change", this.refresh)

    this.refresh()
  }

  checkboxAllTargetDisconnected(checkbox: HTMLInputElement): void {
    checkbox.removeEventListener("change", this.toggle)

    this.refresh()
  }

  checkboxTargetDisconnected(checkbox: HTMLInputElement): void {
    checkbox.removeEventListener("change", this.refresh)

    this.refresh()
  }

  toggle(e: Event): void {
    e.preventDefault()

    this.checkboxTargets.forEach((checkbox) => {
      // @ts-ignore
      checkbox.checked = e.target.checked
      this.triggerInputEvent(checkbox)
    })
  }

  refresh(): void {
    const checkboxesCount = this.checkboxTargets.length
    const checkboxesCheckedCount = this.checked.length

    this.checkboxAllTargets[0].checked = checkboxesCheckedCount > 0
    this.checkboxAllTargets[0].indeterminate = checkboxesCheckedCount > 0 && checkboxesCheckedCount < checkboxesCount
  }

  triggerInputEvent(checkbox: HTMLInputElement): void {
    const event = new Event("input", { bubbles: false, cancelable: true })

    checkbox.dispatchEvent(event)
  }

  checkedGroup(groupName: String|undefined): HTMLInputElement[] {
    return this.checkboxTargets.filter((checkbox) => checkbox.checked && checkbox.dataset.checkboxSelectAllGroup === groupName)
  }

  uncheckedGroup(groupName: String|undefined): HTMLInputElement[] {
    return this.checkboxTargets.filter((checkbox) => !checkbox.checked && checkbox.dataset.checkboxSelectAllGroup === groupName)
  }

  get checked(): HTMLInputElement[] {
    return this.checkedGroup(undefined)
  }

  get unchecked(): HTMLInputElement[] {
    return this.uncheckedGroup(undefined)
  }
}
