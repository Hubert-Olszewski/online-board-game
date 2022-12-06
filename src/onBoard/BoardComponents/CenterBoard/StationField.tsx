import { FC, Fragment } from "react";
import { IClassNames, IKey } from "../../Views/BoardView";
import { GenericField } from "../GenericField";
import ApartmentIcon from '@mui/icons-material/Apartment';

export const StationField: FC<IClassNames> = ({className, label}, {key}: IKey) => (
    <div className="space railroad" key={key}>
        <GenericField elements={
            <Fragment>
                <div className="name">{label}</div>
                <i className={className}>
                    <ApartmentIcon style={{width: '2em', height: '2em'}}/>
                </i>
                <div className="price">Price $200</div>
            </Fragment>
        }/>
    </div>
);