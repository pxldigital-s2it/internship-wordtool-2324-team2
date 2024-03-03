import * as React from "react";
import { useEffect, useState } from "react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { AddButton, CategoryComponent, Modal } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectData, selectIsLoading } from "../../redux/category/category.slice";
import { loadData } from "../../middleware/category/CategoryMiddleware";
import FreeFeedbackInput from "../../components/freefeedbackinput/FreeFeedbackInput";
import { Toggle } from "@fluentui/react";
import { selectAlwaysInsertFullText, toggleAlwaysInsertFullText } from "../../redux/settings/settings.slice";

const taskPaneClassNames = mergeStyleSets({
  fixedInputBox: {
    backgroundColor: "white",
    bottom: "0",
    height: "64px",
    left: "-24px",
    paddingLeft: "30px",
    position: "fixed",
    width: "100%",
    zIndex: "1000"
  },
  taskPane: {
    borderCollapse: "collapse",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "80px",
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
  const [favoritesHidingEnabled, setFavoritesHidingEnabled] = useState(true);

  const categories = useAppSelector(selectData) || []; // Ensure categories is always an array
  const isLoading = useAppSelector(selectIsLoading);
  const alwaysInsertFullText = useAppSelector(selectAlwaysInsertFullText);

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
      ? category.subCategories.filter(sub => !favoritesHidingEnabled || !sub.isFavorite)
      : category.subCategories;

    return {
      ...category,
      subCategories: filteredSubCategories
    };
  });

  const setAlwaysInsertFullText = () => {
    dispatch(toggleAlwaysInsertFullText());
  }

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
      <div className={taskPaneClassNames.fixedInputBox}>
        <FreeFeedbackInput />
      </div>
      <div style={{ paddingLeft: '16px' }}>
        <Toggle
          label="Favorieten apart bovenaan tonen"
          checked={favoritesHoistingEnabled}
          onChange={() => setFavoritesHoistingEnabled(!favoritesHoistingEnabled)}
          style={{ margin: '10px' }}
        />
      </div>
      <div style={{ paddingLeft: '16px' }}>
        <Toggle
          label="Favorieten ook verbergen uit eigen categorie"
          checked={favoritesHidingEnabled}
          onChange={() => setFavoritesHidingEnabled(!favoritesHidingEnabled)}
          style={{ margin: '10px' }}
        />
      </div>
      <div style={{ paddingLeft: '16px' }}>
        <Toggle
          label="Favorieten altijd als volledige tekst invoegen"
          checked={alwaysInsertFullText}
          onChange={setAlwaysInsertFullText}
          style={{ margin: '10px' }}
        />
      </div>
      <Modal />
      {isLoading ? (
        <div>Aan het laden...</div>
      ) : (
        <div style={{ borderCollapse: "collapse", width: "100%" }}>
          {modifiedCategories.map(category => (
            <CategoryComponent key={category.id} {...category} />
          ))}
        </div>
      )}
      <AddButton />
    </div>
  );
};

export default TaskPane;
