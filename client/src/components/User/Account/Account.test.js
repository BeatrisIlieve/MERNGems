import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Account } from "./Account";
import { personalInformationServiceFactory } from "../../../services/personalInformationService";

const mockAuthContextValue = {
  userId: "user123",
};

jest.mock("../../../services/personalInformationService", () => ({
  personalInformationServiceFactory: jest.fn(),
}));

const mockFind = jest.fn();

describe("Account Component", () => {
  beforeEach(() => {
    personalInformationServiceFactory.mockReturnValue({
      find: mockFind,
    });
  });

  test("Should Account Component", async () => {
    const mockUserPersonalInformation = {
      firstName: "Test",
    };

    mockFind.mockResolvedValue(mockUserPersonalInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Account />
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("title-element");
    expect(titleElement).toBeInTheDocument();

    await waitFor(() => {
        // Check if the title element is rendered with the correct text
        expect(screen.getByTestId("title-element")).toHaveTextContent(
          `Hi, ${mockUserPersonalInformation.firstName}`
        );
      });

    const paragraphElement = screen.getByTestId("paragraph-element");
    expect(paragraphElement).toBeInTheDocument();

    const accountDetailsTitleElement = screen.getByTestId(
      "account-details-title-element"
    );
    expect(accountDetailsTitleElement).toBeInTheDocument();

    const orderHistoryTitleElement = screen.getByTestId(
      "order-history-title-element"
    );
    expect(orderHistoryTitleElement).toBeInTheDocument();
  });
});
