/**
 * @jest-environment jsdom
 */

import { Application } from "@hotwired/stimulus"
import CheckboxSelectGroup from "../src/index"

const startStimulus = (): void => {
  const application = Application.start()
  application.register("checkbox-select-group", CheckboxSelectGroup)
}

beforeEach((): void => {
  startStimulus()

  document.body.innerHTML = `
    <form data-controller="checkbox-select-group">
      <input id="checkbox-select-group" type="checkbox" data-checkbox-select-group-target="checkboxAll" />
      <input type="checkbox" data-checkbox-select-group-target="checkbox" />
      <input type="checkbox" data-checkbox-select-group-target="checkbox" checked="checked" />
      <input type="checkbox" data-checkbox-select-group-target="checkbox" />
    </form>
  `
})

describe("#toggle", () => {
  it("should select all checkboxes", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-group")
    const targetsBefore: NodeList = document.querySelectorAll("[data-checkbox-select-group-target='checkbox']:checked")

    expect(targetsBefore.length).toBe(1)

    // Uncheck all
    toggleCheckbox.click()

    // Check all
    toggleCheckbox.click()

    const targetsAfter: NodeList = document.querySelectorAll("[data-checkbox-select-group-target='checkbox']:checked")

    expect(targetsAfter.length).toBe(3)
  })
})

describe("#refresh", () => {
  it("change the checkboxAll state", (): void => {
    const toggleCheckbox: HTMLInputElement = document.querySelector("#checkbox-select-group")

    expect(toggleCheckbox.checked).toBe(true)
    expect(toggleCheckbox.indeterminate).toBe(true)
  })
})

describe("with multiple groups", () => {
  beforeEach((): void => {
    document.body.innerHTML = `
      <form data-controller="checkbox-select-group">
        <input id="checkbox-select-group-1" type="checkbox" data-checkbox-select-group-target="checkboxAll" data-checkbox-select-group-name="1" />
        <input type="checkbox" data-checkbox-select-group-target="checkbox" data-checkbox-select-group-name="1" />
        <input type="checkbox" data-checkbox-select-group-target="checkbox" data-checkbox-select-group-name="1" checked="checked" />
        <input type="checkbox" data-checkbox-select-group-target="checkbox" data-checkbox-select-group-name="1" />
        
        <input id="checkbox-select-group-2" type="checkbox" data-checkbox-select-group-target="checkboxAll" data-checkbox-select-group-name="2" />
        <input type="checkbox" data-checkbox-select-group-target="checkbox" data-checkbox-select-group-name="2" />
        <input type="checkbox" data-checkbox-select-group-target="checkbox" data-checkbox-select-group-name="2" checked="checked" />
        <input type="checkbox" data-checkbox-select-group-target="checkbox" data-checkbox-select-group-name="2" />
      </form>
    `
  })

  describe("#toggle", () => {
    function checkedTargetsForGroup(groupNumber: number): NodeList {
      return document.querySelectorAll(`[data-checkbox-select-group-target='checkbox'][data-checkbox-select-group-name='${groupNumber}']:checked`)
    }

    it("should select all checkboxes in the group", (): void => {
      const toggleCheckbox1: HTMLInputElement = document.querySelector("#checkbox-select-group-1")
      const toggleCheckbox2: HTMLInputElement = document.querySelector("#checkbox-select-group-2")

      expect(checkedTargetsForGroup(1).length).toBe(1)
      expect(checkedTargetsForGroup(2).length).toBe(1)

      // Uncheck all
      toggleCheckbox1.click()
      expect(checkedTargetsForGroup(1).length).toBe(0)
      expect(checkedTargetsForGroup(2).length).toBe(1)
      toggleCheckbox2.click()
      expect(checkedTargetsForGroup(1).length).toBe(0)
      expect(checkedTargetsForGroup(2).length).toBe(0)

      // Check all
      toggleCheckbox1.click()
      expect(checkedTargetsForGroup(1).length).toBe(3)
      expect(checkedTargetsForGroup(2).length).toBe(0)
      toggleCheckbox2.click()
      expect(checkedTargetsForGroup(1).length).toBe(3)
      expect(checkedTargetsForGroup(2).length).toBe(3)
    })
  })

  describe("#refresh", () => {
    it("change the checkboxAll state", (): void => {
      const toggleCheckbox1: HTMLInputElement = document.querySelector("#checkbox-select-group-1")
      const toggleCheckbox2: HTMLInputElement = document.querySelector("#checkbox-select-group-2")

      expect(toggleCheckbox1.checked).toBe(true)
      expect(toggleCheckbox1.indeterminate).toBe(true)
      expect(toggleCheckbox2.checked).toBe(true)
      expect(toggleCheckbox2.indeterminate).toBe(true)
    })
  })
});
