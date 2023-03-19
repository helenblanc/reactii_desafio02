import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from 'react';
import AppContext from '../app_context';


/* LLAMADO DE API PERSONAJES RICK & MORTY*/
async function apiRickAndMortyCharacter() {
    const newData = []
    try {
      const url = 'https://rickandmortyapi.com/api/character';
      //console.log('call api rick and morty: ', url)
      // Documentacion API https://rickandmortyapi.com/documentation
      const response = await fetch(url)
      const dataJ = await response.json()
      const arr = dataJ.results.sort((a, b) => {
        //  ORDENAR POR NOMBRE DE LA A A LA Z
        if (a.name < b.name) {
          return -1;
        }
      });
      // CREANDO VARIABLE NEWDATA CON DATOS OBTENIDOS DEL SERVICIO
      // MÁS ATRIBUTO FAVORITO EN FALSO
      // SOLO SE CARGA UNA VEZ YA QUE SE VERIFICA QUE EL CONTEXTO
      // NO ESTE VACIO
      //console.log('arr: ', arr)
      arr.forEach((element) => {
        newData.push({ 'element': element, 'favorite': false , 'style': 'outline-primary icon bi-star'})
      });
    } catch (ex) {
      console.log(ex)
    }
    return newData;
  };


// FUNCIÓN QUE CREA UN COMPONENTE HOME
export const Home = () => {
    console.log('LOADING HOME...')
    const { data, setData } = useContext(AppContext)
    //console.log('data: ', data)
    const [characters, setCharacters] = useState([])
  
    useEffect(() => {
      const fetchData = async () => {
        const arr = await apiRickAndMortyCharacter();
        setCharacters(arr);
        let newData = { 'characters': [], 'isData': false };
        newData.characters = arr;
        newData.isData = true
        setData(newData)
      };
      if (data.isData === false) {
        fetchData()
      }else{
          setCharacters(data.characters)
      }
    }, []);
  
    /* FUNCIÓN QUE CREA UN CARD */
    const card = (character, index) => {
      //console.log('load card: ', character)
  
      return (
        <Col key={character.element.id} className="col-4">
          <Card style={{ textAlign: "center", alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }} >
            <Card.Img variant="top" src={character.element.image} />
            <Card.Body >
              <Card.Title>{character.element.name}</Card.Title>
              <Card.Text>
                <span className="row text-sm-start" > {character.element.species}</span>
                <span className="row text-sm-start" >{character.element.name}</span>
                <span className="row text-sm-start" >{character.element.gender}</span>
                <span className="row text-sm-start" >{character.element.type}</span>
              </Card.Text>
              <Button variant={character.style} onClick={(e) => { click(e.target, character, index) }}></Button>
            </Card.Body>
          </Card>
        </Col>);
    };
  
    const click = (target, character,index) => {
      //console.log('target: ', target);
      //console.log('click: ', character);
      character.favorite = !character.favorite;
      start(character);
      let copy = characters.slice(0);
      copy[index] = character;
      setCharacters(copy);
      let newData = { 'characters': [], 'isData': false };
      newData.characters = copy;
      newData.isData = true;
      setData(newData);
    };
  
    const start = (character) => {
      //console.log('start: ', character)
      if (character.favorite) {
        character.style = 'outline-primary icon bi-star-fill'
      } else {
        character.style = 'outline-primary icon bi-star'
      }
    }
  
    /* FUNCIÓN QUE CREARA LOS CARDS */
    const cards = (characters) => {
      try {
        //console.log('load cards: ', characters)
        // RECORRER LISTA INGRESADA
        const cards = characters.map(function (character, index) {
          //INVOCAR FUNCIÓN PARA GENERAR UN CARD
          return card(character, index)
        });
        return (<Row id="" className="g-4">{cards}</Row>);
      } catch (ex) {
        console.log(ex)
        return (<Row id="" className="g-4"></Row>);
      }
    };
  
    // CREACIÓN DE COMPONENTE CUSTOMFORM
    return (
      <div style={{ maxWidth: "1024px", margin: '0 auto', alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }}>
        <Form >
          <Row>
            <Col md>
            </Col>
          </Row>
          {cards(characters)}
        </Form>
      </div>
    );
};

export default Home;