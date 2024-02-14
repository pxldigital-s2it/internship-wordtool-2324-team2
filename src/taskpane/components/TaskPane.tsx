import * as React from "react";
import { useEffect } from "react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { AddButton, CategoryComponent, Modal } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectData, selectIsLoading } from "../../redux/category/category.slice";
import { loadData } from "../../middleware/category/CategoryMiddleware";
import SubCategory from "../../types/SubCategory";

const taskPaneClassNames = mergeStyleSets({
  taskPane: {
    borderCollapse: "collapse",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px 0",
    width: "100%"
  },
  titleBar: {
    backgroundColor: "#005a9e",
    color: "white",
    fontSize: "20px",
    fontWeight: "600",
    padding: "10px 20px",
    textAlign: "center"
  }
});

const TaskPane: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectData) || []; // Ensure categories is always an array
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  // dynamically create a "Favorieten" category based on favorited subcategories
  const favoritesCategory = {
    code: "⭐",
    id: "favorites",
    subCategories: categories.reduce((acc, category) => {
      const favSubCategories = category.subCategories.filter((sub: SubCategory) => sub.isFavorite);
      return [...acc, ...favSubCategories];
    }, []),
    title: "Favorieten"
  };

  // include the "Favorites" category at the beginning of the categories list
  const modifiedCategories = [favoritesCategory, ...categories];

  return (
    <div className={taskPaneClassNames.taskPane}>
      <div className={taskPaneClassNames.titleBar}>MayDay</div>
      <Modal />
      {isLoading ? (
        <div>Aan het laden...</div>
      ) : (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead><tr></tr></thead>
          <tbody>
          {modifiedCategories.map(category => (
            <CategoryComponent key={category.id} {...category} />
          ))}
          </tbody>
        </table>
      )}
      <AddButton />
    </div>
  );
};

export default TaskPane;