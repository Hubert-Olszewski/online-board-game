import { Stack } from "@mui/material";
import { CenterBoard } from "../BoardComponents/CenterBoard/CenterBoard";
import { GenericField } from "../BoardComponents/GenericField";
import { FC, Fragment } from "react";
import { PropertyField } from "../BoardComponents/PropertyField";
import { ChanceField } from "../BoardComponents/ChanceField";
import { StationField } from "../BoardComponents/CenterBoard/StationField";
import { TaxField } from "../BoardComponents/TaxField";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import '../../styles/BoardView.scss';
import { Socket } from "socket.io-client";


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
        field: (color: string, name: string, price: string, fieldType: string, key: string) =>
            <Fragment key={key}>
                <GenericField elements={
                    <Fragment>
                        <Stack className="instructions">Zgarnij 200$</Stack>
                        <Stack className="go-word">Start</Stack>
                    </Fragment>
                }/>
                <Stack className="arrow fa fa-long-arrow-left"></Stack>
            </Fragment>
    },
    {
        containerClassName: 'row horizontal-row bottom-row',
        properties: [
            {
                fieldType: 'propertyField',
                color: 'light-blue',
                name: 'Wydział Inżynierii Materia-\nłowej',
                price: 'PRICE $120',
            },
            {
                fieldType: 'propertyField',
                color: 'light-blue',
                name: 'Wydział Górnictwa',
                price: 'PRICE $100'
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
                price: 'PRICE $100'
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
                price: 'Pay $200'
            },
            {
                fieldType: 'propertyField',
                color: 'brown',
                name: 'Organizacja i Zarządzanie',
                price: 'PRICE $50'
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
                price: 'PRICE $50'
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
                <div className="just">Odwie-</div>
                <div className="drawing">
                    <GenericField elements={
                        <Fragment>
                            <div className="window">
                                <div className='bar'></div>
                                <i className="person fa fa-frown-o"></i>
                            </div>
                            <div className="name">ARESZT</div>
                        </Fragment>
                    }/>
                </div>
                <div className="visiting">dziny</div>
            </Fragment>
    },
    {
        containerClassName: 'row vertical-row left-row',
        properties: [
            {
                fieldType: 'propertyField',
                color: 'orange',
                name: 'Studium języków obcych',
                price: 'PRICE $200',
            },
            {
                fieldType: 'propertyField',
                color: 'orange',
                name: 'Ośrodek Sportu',
                price: 'PRICE $180'
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
                price: 'PRICE $180'
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
                price: 'PRICE $160'
            },
            {
                fieldType: 'propertyField',
                color: 'purple',
                name: 'Łąka igrowa',
                price: 'PRICE $140'
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
                price: 'PRICE $140'
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
                        <div className="name">Darmowy</div>
                        <div className="name">Parking</div>
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
                price: 'PRICE $220',
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
                price: 'PRICE $220'
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
                price: 'PRICE $200'
            },
            {
                fieldType: 'propertyField',
                color: 'yellow',
                name: 'Wydział Inżynierii Bio-\nmedycznej',
                price: 'PRICE $260'
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
                price: 'PRICE $260'
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
                        <div className="name">Idziesz</div>
                        <div className="name">Do</div>
                        <div className="name">Więzienia</div>
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
                price: 'PRICE $300',
            },
            {
                fieldType: 'propertyField',
                color: 'green',
                name: 'Wydział Mechaniczny Techno-\nlogiczny',
                price: 'PRICE $300',
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
                price: 'PRICE $320'
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
                price: 'PRICE $350'
            },
            {
                fieldType: 'taxField',
                color: '',
                name: 'Podatek od studiowania',
                price: 'Pay $75.00'
            },
            {
                fieldType: 'propertyField',
                color: 'dark-blue',
                name: 'Wydział AEII',
                price: 'PRICE $400'
            },
        ],
        field: getField
    },
]

export const BoardView:FC<IBoardViewProps> = ({socket}) => {
    return(
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
                                        return item.field(property.color, property.name, property.price, property.fieldType, property.name + index);
                                    })
                                }
                            </div>
                        })
                    }
            </div>
        </div>
    );
}