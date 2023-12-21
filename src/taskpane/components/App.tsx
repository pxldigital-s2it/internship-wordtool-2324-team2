import * as React from "react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import ColourPicker from "./ColourPicker";
import {useState} from "react";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh"
  }
});

const App = (props: AppProps) => {
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.
  const listItems: HeroListItem[] = [
    {
      icon: <Ribbon24Regular />,
      primaryText: "Achieve more with Office integration"
    },
    {
      icon: <LockOpen24Regular />,
      primaryText: "Unlock features and functionality"
    },
    {
      icon: <DesignIdeas24Regular />,
      primaryText: "Create and visualize like a pro"
    }
  ];
  //Const to demonstrate ColourPicker component
  const [selectedColor , setSelectedColor] = useState<string>("#000000"); // Default color
  
  return (
    <div className={styles.root}>
      <Header logo="assets/logo-filled.png" title={props.title} message="Welcome" />
      <HeroList message="Discover what this add-in can do for you today!" items={listItems} />
      <TextInsertion />
      <ColourPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>  {/*Testing purposes*/}
    </div>
  );
};

export default App;
