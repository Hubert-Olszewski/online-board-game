import { FC, useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { IUser } from '../../App';
import { StyledButton } from '../../components/BasicButton';
import textToDisplayPL from '../../assets/textToDisplay/pl-PL.json';

interface IControlPanelViewProps {
    socket: Socket;
}

const rollDice = () => Math.floor(Math.random() * 6) + 1;
const {controlPanelView} = textToDisplayPL;

export const ControlPanelView: FC<IControlPanelViewProps> = ({socket}) => {
    const [numberDrawn, setNumberDrawn] = useState<number>(0);
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        socket.emit('requestUserProps', socket.id);

        socket.on('responseUserProps', (user: IUser) => {
            console.log('responseUserProps', user);
            
            setUser(user);
        });
    }, []);

    return (
        <div className="control-panel">
            <div className="panel-container">
                <div className="left-panel">
                    <div className="current-player">
                        {/* <div>{user ? user.userName : undefined}</div> */}
                        <div>{controlPanelView.money}:<b>{user ? user.props.money : undefined}PLN</b></div>
                    </div>
                    <div className="drawn-number">
                        <div>{controlPanelView.numberDrawn}:</div>
                        <div><b>{numberDrawn}</b></div>
                    </div>
                </div>
                <div className="right-panel"></div>
                <StyledButton className="roll-dice" onClick={() => setNumberDrawn(rollDice() + rollDice())}>{controlPanelView.drawNumber}</StyledButton>
            </div>
        </div>
    );
}