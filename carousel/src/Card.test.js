import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

test("should render", () => {
	render(<Card />);
});

test("it matches snapshot", () => {
	const { asFragment } = render(<Card />);
	expect(asFragment()).toMatchSnapshot();
});
