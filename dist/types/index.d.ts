import { Controller } from "@hotwired/stimulus";
export default class CheckboxSelectGroup extends Controller {
    checkboxTargets: HTMLInputElement[];
    checkboxAllTargets: HTMLInputElement[];
    static targets: string[];
    initialize(): void;
    checkboxAllTargetConnected(checkbox: HTMLInputElement): void;
    checkboxTargetConnected(checkbox: HTMLInputElement): void;
    checkboxAllTargetDisconnected(checkbox: HTMLInputElement): void;
    checkboxTargetDisconnected(checkbox: HTMLInputElement): void;
    toggle(e: Event): void;
    refresh(): void;
    isAtLeastOneBoxChecked(selectGroupCheckbox: HTMLInputElement): boolean;
    areSomeButNotAllBoxesChecked(selectGroupCheckbox: HTMLInputElement): boolean;
    groupCheckboxes(selectGroupCheckbox: HTMLInputElement): HTMLInputElement[];
    groupName(checkbox: HTMLInputElement): String | undefined;
    triggerInputEvent(checkbox: HTMLInputElement): void;
}
