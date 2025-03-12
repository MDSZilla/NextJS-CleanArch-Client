'use client';

import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

export type ExampleContextType = {
    exampleName: string;
    exampleDate: Date;
};

const ExampleContext = createContext<any>(undefined);

export function ExampleWrapper({children} : {children: React.ReactNode}){

    let [exampleInfo, setExampleInfo] = useState<ExampleContextType>({exampleName: "", exampleDate: new Date()});

    return (
        <ExampleContext.Provider value={{exampleInfo, setExampleInfo}}>
            {children}
        </ExampleContext.Provider>
    )
};

export function useExampleContext(): { spinnerInfo: ExampleContextType, setSpinnerInfo: Dispatch<SetStateAction<ExampleContextType>> }{
    return useContext(ExampleContext);
};