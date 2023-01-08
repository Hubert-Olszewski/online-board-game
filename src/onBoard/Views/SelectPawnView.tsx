import { FC, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import bluePawn from '../../assets/pawns/bluePawn.png';
import greenPawn from '../../assets/pawns/greenPawn.png';
import yellowPawn from '../../assets/pawns/yellowPawn.png';
import redPawn from '../../assets/pawns/redPawn.png';
import smoke from '../../assets/pawns/smoke.png';
import { Typography } from '@mui/material';
import textToDisplayPL from '../../assets/textToDisplay/pl-PL.json';

interface ISelectPawnViewProps {
  socket: Socket;
  setColor: (pawn: string) => void;
  playerName: string;
}

export const SelectPawnView: FC<ISelectPawnViewProps> = ({setColor, playerName, socket}) => {
  const [pawns, setPawns] = useState<string[]>([]),

  setPlayer = (pawn: string) => {
    if(pawn !== 'smoke'){
      setColor(pawn);
    }
    else{
      console.log('Smoked');
    }
  },

  getImage = (imgName: string) => {
    switch (imgName) {
      case 'yellowPawn':
        return yellowPawn;
      case 'redPawn':
        return redPawn;
      case 'greenPawn':
        return greenPawn;
      case 'bluePawn':
        return bluePawn;
      case 'smoke':
        return smoke;
      default:
        return null;
    }
  }

  useEffect(() => {
    socket.emit('getPawns');
    socket.on('gotPawns', (statePawns: string[]) => {
      setPawns(statePawns)
    });
  }, []);

  return (
    <div className="select-pawn-view">
      <Typography variant="h4">{playerName}, {textToDisplayPL.SelectPawnView.select}:</Typography>
      {
        pawns.map((pawn, index) => (
          <div className="pawn-container" key={pawn+index} onClick={() => setPlayer(pawn)}>
            <img
              className="pawn"
              alt={pawn}
              src={getImage(pawn)} />
          </div>
        ))
      }
    </div>
  );
}