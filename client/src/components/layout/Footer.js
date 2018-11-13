import React, { Component } from "react";
import Icon from "./favicon.png"
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onAboutClick = () => {
    this.setState({ open: true })
  }

  render() {
    const { open } = this.state;

  return (
    <footer className="bg-ligth text-dark mt-5 p-4 text-center">
      <span><img src={Icon} className="favicon" /></span>
      <p>
        Copyright &copy; 2018 MEMO</p>
        <p><Link to="" onClick={this.onAboutClick.bind(this)}> Acerca de MEMO </Link> | 
        <a href="https://github.com/fideliocc/memo" target="_blank" rel="noopener noreferrer"> Github </a> | 
        <a href={"mailto:ecalle17@gmail.com"}> Contactar </a>
      </p> 

      <Modal
      open={open}
      onClose={this.onCloseModal}
      center
      classNames={{ overlay: 'black-overlay', modal: 'white' }}
    >
      <img src={Icon} className="favicon" />
      <h1>Las peores historias del día</h1>
      <h5>Un espacio para compartir tus desgracias y dejarlas ir.</h5><hr/>
      <p>Publica y espera nuestra aprobación para que aparezca a la comunidad, así nos aseguramos de mantener solo las peores historias.
      Si la tuya no aparece en tus posts en las próximas 24 horas simplemente habrá desaparecido. Pero tranquilidad, siempre tendrás algo terrible que contar.</p>
      <br />
      <p><Link to={"/login"}>Inicia sesión</Link> o <Link to={"/register"}>regístrate</Link> para continuar</p>
    </Modal>

    </footer>

    );
  }
};

export default Footer;
