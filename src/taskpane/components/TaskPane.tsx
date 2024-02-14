import * as React from "react";
import { useEffect } from "react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { AddButton, CategoryComponent, Modal } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectData, selectIsLoading } from "../../redux/category/category.slice";
import { loadData } from "../../middleware/category/CategoryMiddleware";

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
  const categories = useAppSelector(selectData);
  const isLoading = useAppSelector(selectIsLoading);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(loadData());
  }, []);

  return (
    <div>
      <div className={taskPaneClassNames.titleBar}>MayDay</div>
      <Modal />
      <div className={taskPaneClassNames.taskPane}>
        {isLoading && <div>Aan het laden...</div>}
        <table style={{ width:'100%' }}>
          <thead>
          <tr>
          </tr>
          </thead>
          <tbody style={{ width: '100%' }}>
          {categories && categories.map(category => (
            // render the subcategories as rows
            <CategoryComponent key={category.id} {...category} />
          ))}
          </tbody>
        </table>
        <AddButton />
      </div>
    </div>
  );
};

export default TaskPane;
