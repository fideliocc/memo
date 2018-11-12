import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">

      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Editar Perfil
      </Link>


      <Link to="/edit-password" className="btn btn-light">
      <i className="fas fa-unlock-alt text-info mr-1" /> Cambiar contraseña
      </Link>

      {/*<Link to="/edit-password" className="btn btn-light">
      <i className="fas fa-envelope text-info mr-1" /> Cambiar email
      </Link> */}
    </div>

  );
};

export default ProfileActions;
