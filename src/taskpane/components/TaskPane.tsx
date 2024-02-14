import * as React from "react";
import { useEffect, useState } from "react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { AddButton, CategoryComponent, Modal } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectData, selectIsLoading } from "../../redux/category/category.slice";
import { loadData } from "../../middleware/category/CategoryMiddleware";
import { Toggle } from "@fluentui/react";

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
  const [favoritesHoistingEnabled, setFavoritesHoistingEnabled] = useState(true);

  const categories = useAppSelector(selectData) || []; // Ensure categories is always an array
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  // dynamically create a "Favorieten" category based on favorited subcategories
  const favoritesCategory = {
    code: "⭐",
    id: "favorites",
    subCategories: [],
    title: "Favorieten"
  };

  const processedCategories = categories.map(category => {
    const filteredSubCategories = favoritesHoistingEnabled
      ? category.subCategories.filter(sub => !sub.isFavorite)
      : category.subCategories;

    return {
      ...category,
      subCategories: filteredSubCategories
    };
  });

// only add favorites to special category if hoisting is enabled
  if (favoritesHoistingEnabled) {
    favoritesCategory.subCategories = categories.reduce((acc, category) => {
      const favSubCategories = category.subCategories.filter(sub => sub.isFavorite);
      return [...acc, ...favSubCategories];
    }, []);
  }

  // include the "Favorieten" category at the front of the categories list if it contains any favorites
  const modifiedCategories = favoritesCategory.subCategories.length > 0
    ? [favoritesCategory, ...processedCategories]
    : processedCategories;

  return (
    <div className={taskPaneClassNames.taskPane}>
      <div className={taskPaneClassNames.titleBar}>MayDay</div>
      <div style={{ padding: '16px', width: '100%' }}>
        <Toggle
          label="Favorieten bovenaan tonen"
          checked={favoritesHoistingEnabled}
          onChange={() => setFavoritesHoistingEnabled(!favoritesHoistingEnabled)}
          style={{ margin: '10px' }}
        />
      </div>
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