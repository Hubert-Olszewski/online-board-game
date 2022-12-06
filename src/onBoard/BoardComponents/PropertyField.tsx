import { FC, Fragment } from "react";
import { IKey } from "../Views/BoardView";
import { GenericField } from "./GenericField";

interface IPropertyField {
    color: string;
    name: string;
    price: string;
}

export const PropertyField: FC<IPropertyField> = ({color, name, price}, {key}: IKey) => {
    return (
        <div className="space property" key={key}>
            <GenericField elements={
                <Fragment>
                    <div className={`color-bar ${color}`} />
                    <div className="name">{name}</div>
                    <div className="price">{price}</div>
                </Fragment>
            }/>
        </div>
    );
}