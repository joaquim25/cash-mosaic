import React from 'react';
import { RenderResult, fireEvent, render as rtlRender} from "@testing-library/react";
import {screen} from '@testing-library/dom'
import "@testing-library/jest-dom";
import { Provider } from 'react-redux';
import ProfilePage from '@/pages/profile';
import store from '@/store';

// mock useRouter
jest.mock('next/router', () => require('next-router-mock'));
const render = (component: React.ReactNode): RenderResult => {
    return rtlRender(
        <Provider store={store}>
            {component}
        </Provider>
    );
};


const mockUserLogged = {
    id: 1,
    firstname: "João",
    lastname: "Carvalho",
    location: "Loulé",
    bio: "A bio do João",
    isLoggedIn: true,
    password: "",
}


describe('Profile page', () => {
    it("should render properly with logged in user", () => {
        render(<ProfilePage user={mockUserLogged} />)

        //input data
        expect(screen.getByDisplayValue("João")).toBeInTheDocument;
        expect(screen.getByDisplayValue("Carvalho")).toBeInTheDocument;
        expect(screen.getByDisplayValue("Loulé")).toBeInTheDocument;
        expect(screen.getByDisplayValue("A bio do João")).toBeInTheDocument;
    })

    it("should allow user to edit and save changes to their profile", () => {
        render(<ProfilePage user={mockUserLogged} />)

        // Click on edit button for firstname
        fireEvent.click(screen.getByTestId("edit-firstname"));

        // Change firstname input value
        fireEvent.change(screen.getByTestId("input-firstname"), { target: { value: "Ricardo" } });

        // Click on save button for firstname
        fireEvent.click(screen.getByTestId("save-firstname"));

        // Check if firstname value is updated
        expect(screen.getByDisplayValue("Ricardo")).toBeInTheDocument;
    })

    it("should allow user to cancel changes to their profile", () => {
        render(<ProfilePage user={mockUserLogged} />)

        // Click on edit button for firstname
        fireEvent.click(screen.getByTestId("edit-firstname"));

        // Change firstname input value
        fireEvent.change(screen.getByTestId("input-firstname"), { target: { value: "John" } });

        // Click on cancel button for firstname
        fireEvent.click(screen.getByTestId("cancel-firstname"));

        // Check if firstname value is reverted back to original value
        expect(screen.getByDisplayValue("João")).toBeInTheDocument;
    })

    it("should revert all fields back to their original values when cancelling changes", () => {
        render(<ProfilePage user={mockUserLogged} />);

        // Click on edit button for firstname
        fireEvent.click(screen.getByTestId("edit-firstname"));

        // Change firstname input value
        fireEvent.change(screen.getByTestId("input-firstname"), { target: { value: "Daniel" } });

        // Change lastname input value
        fireEvent.change(screen.getByTestId("input-lastname"), { target: { value: "Fonseca" } });

        // Change location input value
        fireEvent.change(screen.getByTestId("input-location"), { target: { value: "Porto" } });

        // Change bio input value
        fireEvent.change(screen.getByTestId("input-bio"), { target: { value: "A bio do Fonseca" } });

        // Click on Genral cancel button for firstname
        fireEvent.click(screen.getByRole("button",{name: "Cancel"}));

        // Check if firstname value is reverted back to original value
        expect(screen.getByDisplayValue("João")).toBeInTheDocument;

        // Check if lastname value is reverted back to original value
        expect(screen.getByDisplayValue("Carvalho")).toBeInTheDocument;

        // Check if location value is reverted back to original value
        expect(screen.getByDisplayValue("Loulé")).toBeInTheDocument;

        // Check if bio value is reverted back to original value
        expect(screen.getByDisplayValue("A bio do João")).toBeInTheDocument;
    })
})