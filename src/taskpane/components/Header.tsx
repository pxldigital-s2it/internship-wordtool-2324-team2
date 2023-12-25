import * as React from "react";
import { Image, makeStyles, tokens } from "@fluentui/react-components";
import ContextMenu from "../../components/contextmenu/ContextMenu";
import { categoryContextMenu } from "../../patterns/observer";

export interface HeaderProps {
  title: string;
  logo: string;
  message: string;
}

const useStyles = makeStyles({
  message: {
    fontColor: tokens.colorNeutralBackgroundStatic,
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightRegular
  },
  welcome__header: {
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    paddingBottom: "30px",
    paddingTop: "100px"
  }
});

const exampleContextMenuItems = [
  {
    handler: () => console.log("Sub Categorie"),
    label: categoryContextMenu.getSubCategoryLabel()
  },
  {
    handler: () => console.log("Wijzigen"),
    label: categoryContextMenu.getEditLabel()
  },
  {
    handler: () => console.log("Verwijderen"),
    label: categoryContextMenu.getDeleteLabel()
  }
];

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, logo, message } = props;
  const styles = useStyles();

  return (
    <section className={styles.welcome__header}>
      <Image width="90" height="90" src={logo} alt={title} />
      <ContextMenu trigger={<h1 className={styles.message}>{message}</h1>} menuItems={exampleContextMenuItems} />
    </section>
  );
};

export default Header;
