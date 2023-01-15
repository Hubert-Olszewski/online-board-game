import { Socket } from "socket.io-client";
import { Stack } from "@mui/material";
import { CenterBoard } from "../BoardComponents/CenterBoard/CenterBoard";
import { GenericField } from "../BoardComponents/GenericField";
import { FC, Fragment, useEffect, useState } from "react";
import { PropertyField } from "../BoardComponents/PropertyField";
import { ChanceField } from "../BoardComponents/ChanceField";
import { StationField } from "../BoardComponents/StationField";
import { TaxField } from "../BoardComponents/TaxField";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import '../../styles/BoardView.scss';
import textToDisplayPL from '../../assets/textToDisplay/pl-PL.json';
import { IUser } from '../../App';
import { getPawnImage } from "./SelectPawnView";

interface IBoardViewProps {
    socket: Socket;
}

export interface IClassNames{
    className: string;
    label: string;
    description?: string;
}

export interface IKey{
    key: string;
}

const { boardView, general } = textToDisplayPL;

const getField = (color: string, name: string, price:string, fieldType: string, key: string) => {
    switch (fieldType) {
        case 'propertyField':
            return <PropertyField color={color} name={name} price={price} key={key}/>;
        case 'chanceField':
            return <ChanceField className="drawing fa fa-question" label={name} key={key}/>;
        case 'stationField':
            return <StationField className="drawing fa fa-subway" label={name} key={key}/>;
        default:
            return <TaxField className={fieldType === 'taxField' ? "diamond" : 'giftcard'} label={name} description={price} key={key}/>;
    }
}

const boardItems = [
    {
        containerClassName: 'space corner go',
        properties: [
            {
                fieldType: '',
                color: '',
                name: '',
                price: '',
            },
        ],
        field: (color: string, name: string, price: string, fieldType: string, key: string, pawns: string[]) =>
            <Fragment key={key}>
                <GenericField elements={
                    <Fragment>
                        <Stack className="instructions">{boardView.startFieldInstruction}</Stack>
                        <Stack className="go-word">{general.start}</Stack>
                    </Fragment>
                }/>
                {pawns.map(it => <img key={it} className="corner-field-pawn" alt={it} src={getPawnImage(it)} />)}
            </Fragment>
    },
    {
        containerClassName: 'row horizontal-row bottom-row',
        properties: [
            {
                fieldType: 'propertyField',
                color: 'light-blue',
                name: 'Wydział Inżynierii Materia-\nłowej',
                price: '120pln',
            },
            {
                fieldType: 'propertyField',
                color: 'light-blue',
                name: 'Wydział Górnictwa',
                price: '100pln'
            },
            {
                fieldType: 'chanceField',
                color: '',
                name: 'Szansa dla studenta',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'light-blue',
                name: 'Wydział Elektryczny',
                price: '100pln'
            },
            {
                fieldType: 'stationField',
                color: '',
                name: 'Dom Studencki "PIAST"',
                price: ''
            },
            {
                fieldType: 'taxField',
                color: '',
                name: 'Opłata warunku',
                price: '200pln'
            },
            {
                fieldType: 'propertyField',
                color: 'brown',
                name: 'Organizacja i Zarządzanie',
                price: '50pln'
            },
            {
                fieldType: 'chestField',
                color: '',
                name: 'Kasa studencka',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'brown',
                name: 'Badania nad Edukacją i Komunikacją',
                price: '50pln'
            },
        ],
        field: getField
    },
    {
        containerClassName: 'space corner jail',
        properties: [
            {
                fieldType: '',
                color: '',
                name: '',
                price: '',
            },
        ],
        field: (color: string, name: string, price: string, fieldType: string, key: string) =>
            <Fragment key={key}>
                <div className="just">{boardView.just}</div>
                <div className="drawing">
                    <GenericField elements={
                        <Fragment>
                            <div className="window">
                                <div className='bar'></div>
                                <i className="person fa fa-frown-o"></i>
                            </div>
                            <div className="name">{boardView.jail}</div>
                        </Fragment>
                    }/>
                </div>
                <div className="visiting">{boardView.visiting}</div>
            </Fragment>
    },
    {
        containerClassName: 'row vertical-row left-row',
        properties: [
            {
                fieldType: 'propertyField',
                color: 'orange',
                name: 'Studium języków obcych',
                price: '200pln',
            },
            {
                fieldType: 'propertyField',
                color: 'orange',
                name: 'Ośrodek Sportu',
                price: '180pln'
            },
            {
                fieldType: 'chanceField',
                color: '',
                name: 'Szansa dla studenta',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'orange',
                name: 'Centrum Nowych Technologii',
                price: '180pln'
            },
            {
                fieldType: 'stationField',
                color: '',
                name: 'Dom studencki "Strzecha"',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'purple',
                name: 'Biblioteka Politechniki Śląskiej',
                price: '160pln'
            },
            {
                fieldType: 'propertyField',
                color: 'purple',
                name: 'Łąka igrowa',
                price: '140pln'
            },
            {
                fieldType: 'chestField',
                color: '',
                name: 'Kasa Studencka',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'purple',
                name: 'Rektorat Politechniki Śląskiej',
                price: '140pln'
            },
        ],
        field: getField
    },
    {
        containerClassName: 'space corner free-parking',
        properties: [
            {
                fieldType: '',
                color: '',
                name: '',
                price: '',
            },
        ],
        field: (color: string, name: string, price: string, fieldType: string, key: string) =>
            <Fragment key={key}>
                <GenericField elements={
                    <Fragment>
                        <i className="drawing fa fa-car">
                            <DirectionsCarIcon style={{width: '3em', height: '3em'}} />
                        </i>
                        <div className="name">{boardView.parking}</div>
                        <div className="name">{boardView.OSIR}</div>
                    </Fragment>
                }/>
            </Fragment>
    },
    {
        containerClassName: 'row horizontal-row top-row',
        properties: [
            {
                fieldType: 'propertyField',
                color: 'red',
                name: 'Inżynieria Środowiska i Energetyki',
                price: '220pln',
            },
            {
                fieldType: 'chanceField',
                color: '',
                name: 'Szansa dla studenta',
                price: ''
            },
            {
                fieldType: 'chestField',
                color: '',
                name: 'Kasa Studencka',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'red',
                name: 'Transport i Inżynieria Lotnicza',
                price: '220pln'
            },
            {
                fieldType: 'stationField',
                color: '',
                name: 'Dom studencki "Karlik"',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'yellow',
                name: 'Geometria i Grafika Inżynierska',
                price: '200pln'
            },
            {
                fieldType: 'propertyField',
                color: 'yellow',
                name: 'Wydział Inżynierii Bio-\nmedycznej',
                price: '260pln'
            },
            {
                fieldType: 'chestField',
                color: '',
                name: 'Kasa Studencka',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'yellow',
                name: 'Wydział Chemiczny',
                price: '260pln'
            },
        ],
        field: getField
    },
    {
        containerClassName: 'space corner go-to-jail',
        properties: [
            {
                fieldType: '',
                color: '',
                name: '',
                price: '',
            },
        ],
        field: (color: string, name: string, price: string, fieldType: string, key: string) =>
            <Fragment key={key}>
                <GenericField elements={
                    <Fragment>
                        <i className="drawing fa fa-gavel">
                            <LocalPoliceIcon style={{width: '2em', height: '2em'}} />
                        </i>
                        <div className="name">{boardView.goToJail[0]}</div>
                        <div className="name">{boardView.goToJail[1]}</div>
                        <div className="name">{boardView.goToJail[2]}</div>
                    </Fragment>
                }/>
            </Fragment>
    },
    {
        containerClassName: 'row vertical-row right-row',
        properties: [
            {
                fieldType: 'propertyField',
                color: 'green',
                name: 'Wydział Budo-\nwnictwa',
                price: '300pln',
            },
            {
                fieldType: 'propertyField',
                color: 'green',
                name: 'Wydział Mechaniczny Techno-\nlogiczny',
                price: '300pln',
            },
            {
                fieldType: 'chestField',
                color: '',
                name: 'Kasa studencka',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'green',
                name: 'Wydział Architektury',
                price: '320pln'
            },
            {
                fieldType: 'stationField',
                color: '',
                name: 'Dom studencki "Elektron"',
                price: ''
            },
            {
                fieldType: 'chanceField',
                color: '',
                name: 'Szansa dla studenta',
                price: ''
            },
            {
                fieldType: 'propertyField',
                color: 'dark-blue',
                name: 'Wydział Matematyki Stosowanej',
                price: '350pln'
            },
            {
                fieldType: 'taxField',
                color: '',
                name: 'Podatek od studiowania',
                price: '75pln'
            },
            {
                fieldType: 'propertyField',
                color: 'dark-blue',
                name: 'Wydział AEII',
                price: '400pln'
            },
        ],
        field: getField
    },
]

export const BoardView:FC<IBoardViewProps> = ({socket}) => {
    const [players, setPlayers] = useState<IUser[]>([]);

    useEffect(() => {
        socket.on("playerJoinedRoom", (newUser: IUser) => {
            console.log('playerJoinedRoom - BoardView', newUser);
            setPlayers(arr => [...arr, newUser]);
        });

        socket.on('playerReconnected', (newUser: IUser) => {
            console.log('playerReconnected - BoardView', newUser);
            setPlayers(arr => [...arr, newUser]);
        });

        socket.on('onDisconnect', (disconectedUser: IUser) => {
            console.log('onDisconnect - BoardView', disconectedUser);
            setPlayers(arr => arr.filter(item => item.userId !== disconectedUser.userId));
        });
        
    }, []);

    return (
        <div className="table">
            <div className="board">
                <CenterBoard socket={socket}/>
                    {
                        boardItems.map((item, idx) => {
                            // console.log(item, idx);
                            return <div key={idx} className={item.containerClassName}>
                                {
                                    item.properties?.length &&
                                    item.properties.map((property, index) => {
                                        // console.log(property, index);
                                        return item.field(property.color, property.name, property.price, property.fieldType, property.name + index, players.map(({colorPawn}) => colorPawn));
                                    })
                                }
                            </div>
                        })
                    }
            </div>
        </div>
    );
}