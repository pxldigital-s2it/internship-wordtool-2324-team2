import * as React from "react";
import TaskPane from "./TaskPane";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";

// styles for the app container
const useStyles = mergeStyleSets({
  root: {
    background: "#f3f2f1",
    // use Word's default background color for the task pane
    minHeight: "100vh",
    padding: 10
  }
});

const App: React.FC = () => {
  return (
    <div className={useStyles.root}>
      <TaskPane />
    </div>
  );
};

export default App;
