import * as React from "react";
import { useEffect } from "react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { AddButton, CategoryComponent, Modal } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectData, selectIsLoading } from "../../redux/category/category.slice";
import { loadData } from "../../middleware/category/CategoryMiddleware";
import FreeFeedbackInput from "../../components/freefeedbackinput/FreeFeedbackInput";
import { ContrastWarning } from "../../components/colourpicker/ContrastWarning";
import {
    selectFavoritesHiding,
    selectFavoritesHoisting
} from "../../redux/settings/settings.slice";
import { SettingsPanel } from "../../components/settingspanel/SettingsPanel";

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
    const favoritesHoisting = useAppSelector(selectFavoritesHoisting);
    const favoritesHiding = useAppSelector(selectFavoritesHiding);
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
        const filteredSubCategories = favoritesHoisting
            ? category.subCategories.filter(sub => !favoritesHiding || !sub.isFavorite)
            : category.subCategories;

        return {
            ...category,
            subCategories: filteredSubCategories
        };
    });

// only add favorites to special category if hoisting is enabled
    if (favoritesHoisting) {
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
            <div className={taskPaneClassNames.fixedInputBox}>
                <FreeFeedbackInput/>
            </div>
            <div>
                <SettingsPanel/>
            </div>
            <Modal/>
            <ContrastWarning/>
            {isLoading ? (
                <div>Aan het laden...</div>
            ) : (
                <div style={{ borderCollapse: "collapse", width: "100%" }}>
                    {modifiedCategories.map(category => (
                        <CategoryComponent key={category.id} {...category} />
                    ))}
                </div>
            )}
            <AddButton/>
        </div>
    );
};

export default TaskPane;