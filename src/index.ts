import { Controller } from "@hotwired/stimulus"

export default class CheckboxSelectGroup extends Controller {
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
    const selectGroupCheckbox = e.target as HTMLInputElement;
    this.groupCheckboxes(selectGroupCheckbox).forEach((checkbox) => {
      checkbox.checked = selectGroupCheckbox.checked
      this.triggerInputEvent(checkbox)
    })
  }

  refresh(): void {
    this.checkboxAllTargets.forEach((selectGroupCheckbox) => {
      selectGroupCheckbox.checked = this.isAtLeastOneBoxChecked(selectGroupCheckbox)
      selectGroupCheckbox.indeterminate = this.areSomeButNotAllBoxesChecked(selectGroupCheckbox)
    })
  }

  isAtLeastOneBoxChecked(selectGroupCheckbox: HTMLInputElement): boolean {
    return this.groupCheckboxes(selectGroupCheckbox).filter((c) => c.checked).length > 0
  }

  areSomeButNotAllBoxesChecked(selectGroupCheckbox: HTMLInputElement): boolean {
    const checkboxes = this.groupCheckboxes(selectGroupCheckbox);
    const checkedBoxesCount = checkboxes.filter((c) => c.checked).length

    return (0 < checkedBoxesCount && checkedBoxesCount < checkboxes.length)
  }

  groupCheckboxes(selectGroupCheckbox: HTMLInputElement): HTMLInputElement[] {
    const groupName = this.groupName(selectGroupCheckbox)
    return this.checkboxTargets.filter((c) => this.groupName(c) === groupName)
  }

  groupName(checkbox: HTMLInputElement): String|undefined {
    return checkbox.dataset.checkboxSelectGroupName
  }

  triggerInputEvent(checkbox: HTMLInputElement): void {
    const event = new Event("input", { bubbles: false, cancelable: true })

    checkbox.dispatchEvent(event)
  }
}
