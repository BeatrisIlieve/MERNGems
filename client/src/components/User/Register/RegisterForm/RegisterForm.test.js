import { render, screen, fireEvent } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";
import { AuthContext } from "../../../../contexts/AuthContext";
import { FORM_KEYS } from "./initialFormValues";
import { ERROR_MESSAGES } from "../../../../constants/forms";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("RegisterFrom Component", () => {
  test("Fill First Name with valid data expect success", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe("");
  });
});

describe("RegisterFrom Component", () => {
  test("Fill First Name with empty string expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.firstName);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill First Name with a single letter expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

    fireEvent.change(input, { target: { value: "T" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.firstName);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill First Name including digit expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.FirstName}-input`);

    fireEvent.change(input, { target: { value: "T1" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.FirstName}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.firstName);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill Last Name with valid data expect success", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.LastName}-input`);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.LastName}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe("");
  });
});

describe("RegisterFrom Component", () => {
  test("Fill Last Name with empty string expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.LastName}-input`);

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.LastName}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.lastName);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill Last Name with a single letter expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.LastName}-input`);

    fireEvent.change(input, { target: { value: "T" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.LastName}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.lastName);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill Last Name including digit expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.LastName}-input`);

    fireEvent.change(input, { target: { value: "T1" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.LastName}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.lastName);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill Email and Retype Email with valid data expect success", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.Email}-input`);
    expect(input).toBeInTheDocument();

    const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypeEmail}-input`);
    expect(retypeInput).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test@email.com" } });
    fireEvent.change(retypeInput, { target: { value: "test@email.com" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe("");

    const retypeErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const retypeErrorMessageContent =
      retypeErrorMessageContainer.textContent.trim();
    expect(retypeErrorMessageContent).toBe("");
  });
});

describe("RegisterFrom Component", () => {
  test("Fill Email with empty string, fill Retype Email with valid data expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.Email}-input`);
    expect(input).toBeInTheDocument();

    const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypeEmail}-input`);
    expect(retypeInput).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.change(retypeInput, { target: { value: "test@email.com" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.email);

    const retypeErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const retypeErrorMessageContent =
      retypeErrorMessageContainer.textContent.trim();
    expect(retypeErrorMessageContent).toBe(ERROR_MESSAGES.email);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill Email with valid data, fill Retype Email with empty string expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.Email}-input`);
    expect(input).toBeInTheDocument();

    const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypeEmail}-input`);
    expect(retypeInput).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "test@email.com" } });
    fireEvent.change(retypeInput, { target: { value: "" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.emailMismatch);

    const retypeErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const retypeErrorMessageContent =
      retypeErrorMessageContainer.textContent.trim();
    expect(retypeErrorMessageContent).toBe(ERROR_MESSAGES.emailMismatch);
  });
});

describe("RegisterFrom Component", () => {
  test("Fill Email with invalid data, fill Retype Email with invalid data expect error", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();

    const input = screen.getByTestId(`${FORM_KEYS.Email}-input`);
    expect(input).toBeInTheDocument();

    const retypeInput = screen.getByTestId(`${FORM_KEYS.RetypeEmail}-input`);
    expect(retypeInput).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "t@e.c" } });
    fireEvent.change(retypeInput, { target: { value: "t@e.c" } });
    fireEvent.click(button);

    const errorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const errorMessageContent = errorMessageContainer.textContent.trim();
    expect(errorMessageContent).toBe(ERROR_MESSAGES.email);

    const retypeErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );
    const retypeErrorMessageContent =
      retypeErrorMessageContainer.textContent.trim();
    expect(retypeErrorMessageContent).toBe(ERROR_MESSAGES.email);
  });
});
