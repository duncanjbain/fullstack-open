import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("blog viewing", () => {
  const blog = {
    title: "Jest Test Blog",
    author: "Jest Test Author",
    url: "google.com",
    likes: 15,
  };

  test("renders blog title and author only by default", () => {
    const  component = render(<Blog blog={blog} />);
    expect(component.container).toHaveTextContent("Blog: Jest Test Blog");
    expect(component.container).toHaveTextContent("Author: Jest Test Author");
    expect(component.container).not.toHaveTextContent("Blog Url: google.com");
    expect(component.container).not.toHaveTextContent("Total Likes: 15");
  });

  test("renders blog url and blog likes when view button is clicked", () => {
    const  component = render(<Blog blog={blog} />);
    const viewButton = component.getByText("View");
    fireEvent.click(viewButton);
    expect(component.container).toHaveTextContent("Blog: Jest Test Blog");
    expect(component.container).toHaveTextContent("Author: Jest Test Author");
    expect(component.container).toHaveTextContent("Blog URL: google.com");
    expect(component.container).toHaveTextContent("Total Likes: 15");
  });

  test("if the like button is clicked twice, the event handler for adding likes is called twice", () => {
    const mockHandler = jest.fn();
    const component = render(<Blog blog={blog} handleLike={mockHandler} />);
    const viewButton = component.getByText("View");
    fireEvent.click(viewButton);
    const likeButton = component.getByText("Like!");
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
