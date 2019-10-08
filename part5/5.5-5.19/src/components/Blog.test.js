import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
    title: "Learning Python in 2 days",
    author: "Abhishek Prashant",
    likes: 0
}

const mockHandler = jest.fn()

test("renders blog", () => {

    const component = render(<SimpleBlog blog = {blog} onClick = {mockHandler} />)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.likes)
    component.debug()
})

test("clicking button twice fires handler twice", () => {
    const component = render(<SimpleBlog blog = {blog} onClick = {mockHandler} />)
    const button = component.container.querySelector("button")
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
})