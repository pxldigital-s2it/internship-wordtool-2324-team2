import * as React from 'react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { AddButton, CategoryComponent, Modal } from "../../components";
import { useSelector } from "react-redux";
import { State } from "../../redux/store.types";
import { useEffect } from "react";
import { loadCategories } from "../../redux/categoryData/categoryData.slice";
import { useAppDispatch } from "../../redux/hooks"; // Import the action creator

// Styles for the taskpane and the title bar
const taskPaneClassNames = mergeStyleSets({
  taskPane: {
    padding: "10px 0" // padding above and below the task pane content
  },
  titleBar: {
    // dark blue background for the title bar
    backgroundColor: "#005a9e",
    color: "white",
    fontSize: "20px",
    fontWeight: "600",
    padding: "10px 20px",
    textAlign: "center"
  }
});

// main task pane component with a title and categories
const TaskPane: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: State) => state.categoryData.categories);
  const isLoading = useSelector((state: State) => state.categoryData.isLoading);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  return (
    <div>
      <div className={taskPaneClassNames.titleBar}>MayDay</div>
      <Modal />
      <div className={taskPaneClassNames.taskPane}>
        {isLoading && <div>Aan het laden...</div>}
        {categories && categories.map((category) => (
          <CategoryComponent key={category.id} {...category} />
        ))}
        <AddButton />
      </div>
    </div>
  );
};

export default TaskPane;
