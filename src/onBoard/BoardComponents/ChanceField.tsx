import { Stack } from "@mui/material";
import { FC, Fragment } from "react";
import { IClassNames, IKey } from "../Views/BoardView";
import { GenericField } from "./GenericField";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export const ChanceField: FC<IClassNames> = ({className, label}, {key}: IKey ) => (
    <Stack className="space chance" key={key}>
        <GenericField elements={
            <Fragment>
                <Stack className="name">{label}</Stack>
                <i className={className}>
                    <QuestionMarkIcon sx={{color: 'red', width: '3em', height: '4em'}}></QuestionMarkIcon>
                </i>
            </Fragment>
        }/>
    </Stack>

);