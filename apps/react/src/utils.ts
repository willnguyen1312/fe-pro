import { axe } from "jest-axe";

export async function checkA11y(container: HTMLElement) {
  const result = await axe(container, {
    rules: {
      region: { enabled: false },
    },
  });

  return result;
}
