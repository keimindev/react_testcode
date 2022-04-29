import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Login from "./Login"

jest.mock('axios', () =>({
  __esModule: true,
  default: {
    get : () => ({
      data: {id:1, name:"john"}
    })
  }
}))

test("username input should be rendered" , () =>{
  render(<Login/>);
  const userInputEl = screen.getByPlaceholderText('username');
  expect(userInputEl).toBeInTheDocument()
})

test('password input should be rendered' , () =>{
  render(<Login/>);
  const pwInputEl = screen.getByPlaceholderText(/password/i);
  expect(pwInputEl).toBeInTheDocument()
})

test('button input should be rendered' , () =>{
  render(<Login/>);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument()
})

test("username input should be empty" , () =>{
  render(<Login/>);
  const userInputEl = screen.getByPlaceholderText('username');
  const testValue = "test"

  fireEvent.change(userInputEl, {target:{value:testValue} })
  expect(userInputEl.value).toBe(testValue)
})

test("password input should be empty" , () =>{
  render(<Login/>);
  const pwInputEl = screen.getByPlaceholderText('password');
  expect(pwInputEl.value).toBe("")
})


test('button input should be disabled' , () =>{
  render(<Login/>);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled()
})

test('loading should not be rendered' , () =>{
  render(<Login/>);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent("please wait")
})

test('button input should not be disabled when inputs exist' , () =>{
  render(<Login/>);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const pwInputEl = screen.getByPlaceholderText(/username/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue }})
  fireEvent.change(pwInputEl, { target: { value: testValue }})
  expect(buttonEl).not.toBeDisabled()
})

test('loading should be rendered when click' , () =>{
  render(<Login/>);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText("username");
  const pwInputEl = screen.getByPlaceholderText("username");

  const testValue = "test";
  
  fireEvent.change(usernameInputEl, { target: { value: testValue }})
  fireEvent.change(pwInputEl, { target: { value: testValue }})
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent("please wait")
})

test('loading should not be rendered after fetching' , async () =>{
  render(<Login/>);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText("username");
  const pwInputEl = screen.getByPlaceholderText("username");

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue }})
  fireEvent.change(pwInputEl, { target: { value: testValue }})
  fireEvent.click(buttonEl);

  await waitFor(()  => expect(buttonEl).not.toHaveTextContent("please wait"));
})



test('error message should not be visible' , () =>{
  render(<Login/>);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible()
})
