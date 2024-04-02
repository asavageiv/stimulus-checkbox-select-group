import { Controller } from "@hotwired/stimulus"

export default class CheckboxSelectAll extends Controller {
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
    this.selectGroupTargets(this.groupName(selectGroupCheckbox)).forEach((checkbox) => {
      // @ts-ignore
      checkbox.checked = selectGroupCheckbox.checked
      this.triggerInputEvent(checkbox)
    })
  }

  refresh(): void {
    this.checkboxAllTargets.forEach((selectGroupCheckbox) => {
      const groupName = this.groupName(selectGroupCheckbox)
      const checkboxesCount = this.selectGroupTargets(groupName).length
      const checkboxesCheckedCount = this.checkedGroup(groupName).length

      selectGroupCheckbox.checked = checkboxesCheckedCount > 0
      selectGroupCheckbox.indeterminate = checkboxesCheckedCount > 0 && checkboxesCheckedCount < checkboxesCount
    })
  }

  groupName(checkbox: HTMLInputElement): String|undefined {
    return checkbox.dataset.checkboxSelectAllGroup
  }

  triggerInputEvent(checkbox: HTMLInputElement): void {
    const event = new Event("input", { bubbles: false, cancelable: true })

    checkbox.dispatchEvent(event)
  }

  selectGroupTargets(groupName: String|undefined): HTMLInputElement[] {
    return this.checkboxTargets.filter((checkbox) => this.groupName(checkbox) === groupName)
  }

  checkedGroup(groupName: String|undefined): HTMLInputElement[] {
    return this.selectGroupTargets(groupName).filter((checkbox) => checkbox.checked)
  }

  uncheckedGroup(groupName: String|undefined): HTMLInputElement[] {
    return this.selectGroupTargets(groupName).filter((checkbox) => !checkbox.checked)
  }

  get checked(): HTMLInputElement[] {
    return this.checkedGroup(undefined)
  }

  get unchecked(): HTMLInputElement[] {
    return this.uncheckedGroup(undefined)
  }
}
