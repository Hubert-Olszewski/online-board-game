import { FC } from "react";

interface IGenericField {
    elements: React.ReactNode;
}

export const GenericField: FC<IGenericField> = ({elements}) => (
    <div className="container">
        {elements}
    </div>
);