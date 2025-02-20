import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthenticationService from "../../../services/authentication/AuthenticationService";
import {createNewIngredient, getIngredientType} from "../../../constants/endpoints";

class IngredientsCreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allTypes: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
        fetch(getIngredientType, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'authorization' : AuthenticationService.createBasicAuthToken(username, password)
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({allTypes: jsonResponse})
            }).catch((err) => console.error(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        let object = {};


        data.forEach(function (value, key) {
            if(key == "ingredientTypeId"){
            }
            else{object[key] = value;}
            console.log("Last callback call at index " + key + " with value " + value );
        });
        let json = JSON.stringify(object);

        const ingredientType = data.get("ingredientTypeId");
        console.log(json.toString());
        const username = AuthenticationService.getLoggedInUserName();
        const password = AuthenticationService.getLoggedInUserPassword();
            fetch(createNewIngredient + data.get("ingredientTypeId"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                      'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': '*',
                     'authorization' : AuthenticationService.createBasicAuthToken(username, password)
                },
                body: json
            }).then(function (response) {
                if(response.ok) {
                    alert("Ingredience byla vytvořena");
                    window.location = '/administration/ingredients/create';
                } else {
                    response.json().then(function (res) {
                        alert(res.message)
                    })
                }
            }).then(function (text) {
                console.log(text)
            }).catch(function (error) {
                console.error(error)
            });
        }


    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="forms">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Název</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Název" required/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Cena v kč</Form.Label>
                    <Form.Control name="price" type="text" placeholder="Cena v kč" required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Typ</Form.Label>
                    <Form.Control name="ingredientTypeId" as="select" required>
                        {this.state.allTypes.map((ingredientType, stop) => {
                            return (
                                <option key={stop} value={ingredientType.id} >{ingredientType.name}
                                </option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Vytvořit ingredienci
                </Button>
            </Form>
        )
    };
}

export default IngredientsCreatePage;
