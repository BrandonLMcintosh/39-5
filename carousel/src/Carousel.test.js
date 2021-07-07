import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("should render", () => {
	render(<Carousel />);
});

test("it matches snapshot", () => {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the the arrows", function () {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).toBeInTheDocument();
	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId("right-arrow");
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).not.toBeInTheDocument();
	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).toBeInTheDocument();

	//move back in the carousel
	const leftArrow = queryByTestId("left-arrow");
	fireEvent.click(leftArrow);

	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).toBeInTheDocument();

	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).not.toBeInTheDocument();
});

it("removes left arrow when at the beginning", () => {
	const { queryByTestId } = render(<Carousel />);
	const leftArrow = queryByTestId("left-arrow");
	const rightArrow = queryByTestId("right-arrow");

	expect(leftArrow).not.toBeInTheDocument();
	expect(rightArrow).toBeInTheDocument();
});

it("removes the right arrow when at the end", () => {
	const { queryByTestId } = render(<Carousel />);
	const rightArrow = queryByTestId("right-arrow");

	fireEvent.click(rightArrow);
	fireEvent.click(rightArrow);

	const leftArrow = queryByTestId("left-arrow");

	expect(leftArrow).toBeInTheDocument();
	expect(rightArrow).not.toBeInTheDocument();
});
