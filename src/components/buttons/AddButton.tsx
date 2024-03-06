import * as React from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import STRING_RESOURCES from './Strings';
import { useAppDispatch } from "../../redux/hooks";
import { openCreateCategoryModal } from "../../middleware/modal/ModalMiddleware";

// button for adding new categories and subcategories
const AddButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(openCreateCategoryModal());
    };

    return (
        <PrimaryButton
            iconProps={{ iconName: 'Add' }}
            onClick={handleClick}
            text={STRING_RESOURCES.buttons.add.label}
            styles={{
                root: {
                    color: "#fff",
                    marginTop: 10
                },
                rootHovered: {
                    backgroundColor: '#106ebe'
                }
            }}
        />
    );
};

export default AddButton;