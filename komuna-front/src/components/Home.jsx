import React from 'react'
import '../style/HomeStyle.css'
import LogoKomunaGO from '../image/Logo-KomunaGO.png';
import BTienda from '../image/BTienda.jpg';
import BTurista from '../image/BTurista.jpg';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <div className='containerStart'>

                <div className="containerOne">
                    <img src={LogoKomunaGO} alt="Logo KomunaGo" />
                </div>

                <div className="containerTwo">
                    <Link to="/login-store"> <img className="buttonImg" src={BTienda} alt="button 1" /> </Link>
                    <Link to="/turist-store"> <img className="buttonImg" src={BTurista} alt="button 2" /> </Link>
                </div>

            </div>
        </div>
    )
}
