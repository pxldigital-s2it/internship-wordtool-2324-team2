import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    selectAlwaysInsertFullText, selectFavoritesHiding, selectFavoritesHoisting,
    toggleAlwaysInsertFullText, toggleFavoritesHiding,
    toggleFavoritesHoisting
} from "../../redux/settings/settings.slice";
import SettingsToggle from "./SettingsToggle";
import STRING_RESOURCES from "./Strings";

export const SettingsPanel: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const alwaysInsertFullText = useAppSelector(selectAlwaysInsertFullText);
    const favoritesHoisting = useAppSelector(selectFavoritesHoisting);
    const favoritesHiding = useAppSelector(selectFavoritesHiding);
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

    const setAlwaysInsertFullText = async () => {
        await dispatch(toggleAlwaysInsertFullText());
    }

    const setFavoritesHoisting = () => {
        dispatch(toggleFavoritesHoisting());
    }

    const setFavoritesHiding = () => {
        dispatch(toggleFavoritesHiding());
    }

    // This panel doesn't actually save anything; the buttons are just an example of what
    // someone might want to render in a panel footer.
    const onRenderFooterContent = React.useCallback(
        () => (
            <div>
                <SettingsToggle label={STRING_RESOURCES.settings.labels.favoritesHoisting} checked={favoritesHoisting}
                                onChange={setFavoritesHoisting}/>
                <SettingsToggle label={STRING_RESOURCES.settings.labels.favoritesHiding} checked={favoritesHiding}
                                onChange={setFavoritesHiding}/>
                <SettingsToggle label={STRING_RESOURCES.settings.labels.alwaysInsertFullText}
                                checked={alwaysInsertFullText} onChange={setAlwaysInsertFullText}/>
                <DefaultButton onClick={dismissPanel}>{STRING_RESOURCES.settings.buttons.cancelText}</DefaultButton>
            </div>
        ),
        [dismissPanel, favoritesHoisting, favoritesHiding, alwaysInsertFullText],
    );

    return (
        <div>
            <DefaultButton onClick={openPanel} iconProps={{ iconName: 'Settings' }}
                           aria-label={STRING_RESOURCES.settings.buttons.settingsText}/>
            <Panel
                isOpen={isOpen}
                onDismiss={dismissPanel}
                headerText="Settings"
                closeButtonAriaLabel="Close"
                onRenderFooterContent={onRenderFooterContent}
                // Stretch panel content to fill the available height so the footer is positioned
                // at the bottom of the page
                isFooterAtBottom={true}
            >
            </Panel>
        </div>
    );
};