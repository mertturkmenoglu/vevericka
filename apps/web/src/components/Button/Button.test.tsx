import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Button from "./Button";

describe.concurrent("Button Component Unit Tests", () => {
  it("Should render the component", async () => {
    const component = render(<Button text="Hi" />);
    expect(component.container).toBeInTheDocument();
  });
});
