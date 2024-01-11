import * as React from "react";
import { Image, makeStyles, tokens } from "@fluentui/react-components";
import ContextMenu from "../../components/contextmenu/ContextMenu";
import { categoryContextMenu } from "../../patterns/observer";
import Modal from "../../components/modal/Modal";
import { useAppDispatch } from "../../redux/hooks";
import { runOpenCreateSubCategoryModal, runOpenUpdateSubCategoryModal } from "../../middleware/modal/ModalMiddleware";

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

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, logo, message } = props;
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const exampleContextMenuItems = [
    {
      handler: () => dispatch(runOpenCreateSubCategoryModal("category_1")),
      label: categoryContextMenu.getSubCategoryLabel()
    },
    {
      handler: () => dispatch(runOpenUpdateSubCategoryModal("sub_category_1")),
      label: categoryContextMenu.getEditLabel()
    },
    {
      handler: () => console.log("Verwijderen"),
      label: categoryContextMenu.getDeleteLabel()
    }
  ];

  return (
    <section className={styles.welcome__header}>
      <Image width="90" height="90" src={logo} alt={title} />
      <ContextMenu trigger={<h1 className={styles.message}>{message}</h1>} menuItems={exampleContextMenuItems} />
      <Modal />
    </section>
  );
};

export default Header;
