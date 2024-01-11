import * as React from 'react';
import Category from './Category';
import AddButton from './AddButton';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

// styles for the taskpane and the title bar
const taskPaneClassNames = mergeStyleSets({
  titleBar: {
    // dark blue background for the title bar
    backgroundColor: '#005a9e',
    color: 'white',
    fontSize: '20px',
    fontWeight: '600',
    padding: '10px 20px',
    textAlign: 'center',
  },
  taskPane: {
    padding: '10px 0', // padding above and below the task pane content
  }
});

// main task pane component with a title and categories
const TaskPane = () => {
  return (
    <div>
      <div className={taskPaneClassNames.titleBar}>MayDay</div>
      <div className={taskPaneClassNames.taskPane}>
        <Category id={0} name="Categorie 1" sections={7} />
        <Category id={1} name="Categorie 2" sections={1} />
        <Category id={2} name="Categorie 3" sections={1} />
        <AddButton />
      </div>
    </div>
  );
};

export default TaskPane;
