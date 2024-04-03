import { Controller } from "@hotwired/stimulus";
const _CheckboxSelectGroup = class _CheckboxSelectGroup extends Controller {
  initialize() {
    this.toggle = this.toggle.bind(this), this.refresh = this.refresh.bind(this);
  }
  checkboxAllTargetConnected(checkbox) {
    checkbox.addEventListener("change", this.toggle), this.refresh();
  }
  checkboxTargetConnected(checkbox) {
    checkbox.addEventListener("change", this.refresh), this.refresh();
  }
  checkboxAllTargetDisconnected(checkbox) {
    checkbox.removeEventListener("change", this.toggle), this.refresh();
  }
  checkboxTargetDisconnected(checkbox) {
    checkbox.removeEventListener("change", this.refresh), this.refresh();
  }
  toggle(e) {
    e.preventDefault();
    const selectGroupCheckbox = e.target;
    this.groupCheckboxes(selectGroupCheckbox).forEach((checkbox) => {
      checkbox.checked = selectGroupCheckbox.checked, this.triggerInputEvent(checkbox);
    });
  }
  refresh() {
    this.checkboxAllTargets.forEach((selectGroupCheckbox) => {
      selectGroupCheckbox.checked = this.isAtLeastOneBoxChecked(selectGroupCheckbox), selectGroupCheckbox.indeterminate = this.areSomeButNotAllBoxesChecked(selectGroupCheckbox);
    });
  }
  isAtLeastOneBoxChecked(selectGroupCheckbox) {
    return this.groupCheckboxes(selectGroupCheckbox).filter((c) => c.checked).length > 0;
  }
  areSomeButNotAllBoxesChecked(selectGroupCheckbox) {
    const checkboxes = this.groupCheckboxes(selectGroupCheckbox), checkedBoxesCount = checkboxes.filter((c) => c.checked).length;
    return 0 < checkedBoxesCount && checkedBoxesCount < checkboxes.length;
  }
  groupCheckboxes(selectGroupCheckbox) {
    const groupName = this.groupName(selectGroupCheckbox);
    return this.checkboxTargets.filter((c) => this.groupName(c) === groupName);
  }
  groupName(checkbox) {
    return checkbox.dataset.checkboxSelectGroupName;
  }
  triggerInputEvent(checkbox) {
    const event = new Event("input", { bubbles: !1, cancelable: !0 });
    checkbox.dispatchEvent(event);
  }
};
_CheckboxSelectGroup.targets = ["checkboxAll", "checkbox"];
let CheckboxSelectGroup = _CheckboxSelectGroup;
export {
  CheckboxSelectGroup as default
};
