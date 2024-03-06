import { Icon } from "@fluentui/react";
import * as React from "react";

interface TableButtonProps {
    tdClassName: string;
    clickHandler: () => void;
    iconName: string;
    iconClassName: string;
    iconTitle: string;
    showIconCondition: boolean;
}

const TableButton: React.FC<TableButtonProps> = ({
                                                     tdClassName,
                                                     clickHandler,
                                                     iconName,
                                                     iconClassName,
                                                     showIconCondition,
                                                     iconTitle
                                                 }) => {
    return (<td className={tdClassName}
                onClick={clickHandler}>
        <Icon iconName={iconName} className={`${iconClassName} ${showIconCondition && "showIcon"}`}
              title={iconTitle}/>
    </td>)
}

export default TableButton;