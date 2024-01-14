import * as React from 'react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { AddButton, CategoryComponent, Modal } from "../../components";
import { useEffect, useState } from "react";
import Category from '../../types/Category';

// styles for the taskpane and the title bar
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
  const [categories, setCategories] = useState<Category[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch categories and subCategories in parallel
    Promise.all([
      fetch('http://localhost:3001/categories').then(response => response.json()),
      fetch('http://localhost:3001/subCategories').then(response => response.json())
    ]).then(([categoriesData, subCategoriesData]) => {
      // Combine categories with their subCategories
      const combinedData = categoriesData.map((category) => ({
        ...category,
        subCategories: subCategoriesData.filter(subCategory => subCategory.categoryId === category.id)
      }));

      setCategories(combinedData);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div className={taskPaneClassNames.titleBar}>MayDay</div>
      <Modal />
      <div className={taskPaneClassNames.taskPane}>
        {isLoading && <div>Aan het laden...</div>}
        {categories && categories.map((category) => (
          // Display category using CategoryComponent and fill in data
          <CategoryComponent key={category.id} {...category} />
        ))}
        <AddButton />
      </div>
    </div>
  );
};

export default TaskPane;