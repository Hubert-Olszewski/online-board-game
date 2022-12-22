import { FC, useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { IUser } from '../../App';
import { StyledButton } from '../../components/BasicButton';

interface IControlPanelViewProps {
    socket: Socket;
}

const rollDice = () => Math.floor(Math.random() * 6) + 1;

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
                        <div>{user ? user.userName : undefined}</div>
                        <div>{user ? user.props.money : undefined}$</div>
                    </div>
                    <div className="drawn-number">
                        <div>Number drawn:</div>
                        <div>{numberDrawn}</div>
                    </div>
                </div>
                <div className="right-panel"></div>
                <StyledButton className="roll-dice" onClick={() => setNumberDrawn(rollDice() + rollDice())}>Draw a number</StyledButton>
            </div>
        </div>
    );
}