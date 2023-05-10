import { SetContext } from "../context/setContext";
import { useContext } from "react";

export const useSetContext = () => {
    const context = useContext(SetContext);

    if (!context) {
        throw Error('useSetContext must be used inside a SetContextProvider');
    };

    return context;
};