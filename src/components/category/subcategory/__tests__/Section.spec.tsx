import React from "react";
import Section from "../Section";
import {fireEvent, render} from "@testing-library/react";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {initialState as DEFAULT_MODAL_STATE} from "../../../../redux/modal/modal.slice";

describe('Section Test Suite', () => {
    test('Initial render', () => {
      const { getByText } = render(<Section />);
      expect(getByText('Section Content')).toBeInTheDocument();
    });

    test('Context menu opens on right click', () => {
        const initialState = {
            modal: DEFAULT_MODAL_STATE
        };
        const mockStore = configureStore();
        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <Section />
            </Provider>);

        const sectionContent = getByText('Section Content');

        fireEvent.contextMenu(sectionContent);

        const contextMenuWijzigen = getByText('Wijzigen');
        expect(contextMenuWijzigen).toBeInTheDocument();
    });
});
