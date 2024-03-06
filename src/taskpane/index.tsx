import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Provider } from "react-redux";
import store from "../redux/store";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { setIconOptions } from "@fluentui/react";

// initialize icons before the app renders
initializeIcons();
setIconOptions({
    disableWarnings: true
});

const rootElement: HTMLElement = document.getElementById("container");
const root = createRoot(rootElement)

/* Render application after Office initializes */
Office.onReady(() => {
    root.render(
        <FluentProvider theme={webLightTheme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </FluentProvider>
    );
});

if ((module as any).hot) {
    (module as any).hot.accept("./components/App", () => {
        const NextApp = require("./components/App").default;
        root.render(
            <FluentProvider theme={webLightTheme}>
                <NextApp/>
            </FluentProvider>
        );
    });
}