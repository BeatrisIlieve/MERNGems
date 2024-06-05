import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { PasswordInformationForm } from "./PasswordInformationForm";
import { FORM_KEYS, INITIAL_FORM_VALUES } from "./initialFormValues";
import { ERROR_MESSAGES } from "../../../../../constants/forms";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { loginInformationServiceFactory } from "../../../../../services/loginInformationService";

const userId = "user-id";

const mockAuthContextValue = {
  userId: userId,
};

jest.mock("../../../../../services/loginInformationService", () => ({
  loginInformationServiceFactory: jest.fn(),
}));

const mockFind = jest.fn();
const mockUpdate = jest.fn();

describe("PasswordInformationForm", () => {
  beforeEach(() => {
    loginInformationServiceFactory.mockReturnValue({
      find: mockFind,
      updatePassword: mockUpdate,
    });
  });

  test("Submits the form with valid values; Expect update function to be called", async () => {
    const mockUserInformation = {
      userId: userId,
      password: "123456Tt",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PasswordInformationForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].validTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.validTestData;
    });

    await waitFor(() => {
      expect(mockUpdate).not.toHaveBeenCalledWith(userId, {
        password,
        newPassword,
        ...submitData,
      });
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent("");
    });
  });

  test("Submits the form with invalid values; Expect update function to be called; Expect errors", async () => {
    const mockUserInformation = {
      userId: userId,
      password: "123456Tt",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PasswordInformationForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].invalidTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.invalidTestData;
    });

    await waitFor(() => {
      expect(mockUpdate).not.toHaveBeenCalledWith(userId, {
        password,
        newPassword,
        ...submitData,
      });
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });

  test("Submits the form with empty values; Expect update function to be called; Expect errors", async () => {
    const mockUserInformation = {
      userId: userId,
      password: "123456Tt",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PasswordInformationForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].emptyTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.emptyTestData;
    });

    await waitFor(() => {
      expect(mockUpdate).not.toHaveBeenCalledWith(userId, {
        password,
        newPassword,
        ...submitData,
      });
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });
});