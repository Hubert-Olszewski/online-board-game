import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC } from "react";

interface ISelectProps {
    menuItems: {label: string, value: number}[];
    label: string;
    value: string;
    setValue: (val: string) => void;
}

export const BasicSelect: FC<ISelectProps> = ({menuItems, label, value, setValue}) => {
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <FormControl style={{backgroundColor: 'white', borderColor: 'blue'}} required sx={{ minWidth: 300 }}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select label={label} value={value} onChange={handleChange} displayEmpty  >
                {menuItems.map(
                    ({label, value}, index) => 
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                )}
            </Select>
            </FormControl>
        </div>
    );
}