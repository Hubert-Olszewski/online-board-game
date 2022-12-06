import { FC, Fragment } from "react";
import { IClassNames, IKey } from "../Views/BoardView";
import { GenericField } from "./GenericField";
import DiamondIcon from '@mui/icons-material/Diamond';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export const TaxField: FC<IClassNames> = ({className, label, description}, {key}: IKey) => (
    <div className="space fee income-tax" key={key}>
        <GenericField elements={
            <Fragment>
                <div className="name">{label}</div>
                <div className={className}>
                    {className === 'diamond' ? <DiamondIcon style={{width: '2em', height: '2em'}}/> : <CardGiftcardIcon style={{width: '2em', height: '2em'}}/>}
                </div>
                <div className="instructions">{description}</div>
            </Fragment>
        }/>
    </div>
);