import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../styles/AdministrationPage.css';

class AdministrationPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="administration-container">
                <h1>Veškerá správa systému</h1>
                <h2 className="float-left" style={{paddingTop: '2%'}}>Správa uživatelských účtů:</h2>
                <div className="admin-item">
                    <p className="text-body float-left">Registrace nového uživatele:</p>
                    <Link to="/account/create" className="btn btn-dark float-left">Zde</Link>
                </div>
            </div>
        )
    }
}

export default AdministrationPage;
