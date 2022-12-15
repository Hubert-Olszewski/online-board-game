import { FC } from "react";
import { StyledButton } from "../../components/BasicButton";
import { BasicSelect } from "../../components/BasicSelect";

interface IPanelManagerViewProps {
    startGameOnClick: () => void;
    amountPlayers: string;
    setAmountPlayers: (val: string) => void;
}

export const PanelManagerView: FC<IPanelManagerViewProps> = ({startGameOnClick, setAmountPlayers, amountPlayers}) => {

    return ( 
        <div className="panel-manager-view">
            <div className="panel-manager">
                <BasicSelect 
                    setValue={setAmountPlayers} 
                    value={amountPlayers} 
                    menuItems={[{label: '2 players', value: 2}, {label: '3 players', value: 3}, {label: '4 players', value: 4}]} 
                    label={'Select number of players'}
                />
            </div>
            <StyledButton className="start-game-button" onClick={startGameOnClick} disabled={!amountPlayers} >Start Game</StyledButton>
        </div>
    );
}