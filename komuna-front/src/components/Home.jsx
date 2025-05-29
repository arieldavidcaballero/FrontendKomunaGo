import React from 'react'
import '../styles/HomeStyle.css'
import LogoKomunaGO from '../image/Logo_KomunaGO.png';
import BTienda from '../image/BTienda.jpg';
import BTurista from '../image/BTurista.jpg';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='containerStart'>

            <div className="containerOneHome">
                <img src={LogoKomunaGO} alt="Logo KomunaGo" />
            </div>

            <div className="containerTwoHome">
                <Link to="/login-store"> <img className="buttonImg" src={BTienda} alt="button 1" /> </Link>
                <Link to="/turist-store"> <img className="buttonImg" src={BTurista} alt="button 2" /> </Link>
            </div>

        </div>
    )
}
