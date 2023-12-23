import { axe } from "jest-axe";

export function checkA11y(container: HTMLElement) {
  return axe(container);
}
