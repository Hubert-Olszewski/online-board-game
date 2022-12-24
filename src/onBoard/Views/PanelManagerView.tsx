import { FC } from "react";
import { StyledButton } from "../../components/BasicButton";
import { BasicSelect } from "../../components/BasicSelect";
import textToDisplayPL from '../../assets/textToDisplay/pl-PL.json';

interface IPanelManagerViewProps {
    startGameOnClick: () => void;
    amountPlayers: string;
    setAmountPlayers: (val: string) => void;
}

const { general, panelManager } = textToDisplayPL;

export const PanelManagerView: FC<IPanelManagerViewProps> = ({startGameOnClick, setAmountPlayers, amountPlayers}) => {

    return ( 
        <div className="panel-manager-view">
            <div className="panel-manager">
                <BasicSelect 
                    setValue={setAmountPlayers} 
                    value={amountPlayers} 
                    menuItems={[
                        {label: `2 ${panelManager.players}`, value: 2}, 
                        {label: `3 ${panelManager.players}`, value: 3}, 
                        {label: `4 ${panelManager.players}`, value: 4}
                    ]} 
                    label={panelManager.selectPlayers}
                />
            </div>
            <StyledButton className="start-game-button" onClick={startGameOnClick} disabled={!amountPlayers}>{general.startGame}</StyledButton>
        </div>
    );
}