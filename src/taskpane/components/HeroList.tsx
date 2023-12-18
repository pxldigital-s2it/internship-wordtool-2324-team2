import * as React from "react";
import { tokens, makeStyles } from "@fluentui/react-components";

export interface HeroListItem {
  icon: React.JSX.Element;
  primaryText: string;
}

export interface HeroListProps {
  message: string;
  items: HeroListItem[];
}

const useStyles = makeStyles({
  icon: {
    marginRight: "10px"
  },
  itemText: {
    fontColor: tokens.colorNeutralBackgroundStatic,
    fontSize: tokens.fontSizeBase300
  },
  list: {
    marginTop: "20px"
  },
  listItem: {
    display: "flex",
    paddingBottom: "20px"
  },
  message: {
    fontColor: tokens.colorNeutralBackgroundStatic,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightRegular,
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  welcome__main: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  }
});

const HeroList = (props: HeroListProps) => {
  const { items, message } = props;
  const styles = useStyles();

  const listItems = items.map((item, index) => (
    <li className={styles.listItem} key={index}>
      <i className={styles.icon}>{item.icon}</i>
      <span className={styles.itemText}>{item.primaryText}</span>
    </li>
  ));
  return (
    <div className={styles.welcome__main}>
      <h2 className={styles.message}>{message}</h2>
      <ul className={styles.list}>{listItems}</ul>
    </div>
  );
};

export default HeroList;
