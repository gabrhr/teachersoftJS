
const setToken = (user) => {
  //let token = `Bearer ${newToken}`
  window.localStorage.setItem('loggedUser', JSON.stringify(user));
  //console.log('No puede ingresar más de una vez el token')
}

const getToken = () => {
  const newToken = JSON.parse(window.localStorage.getItem('loggedUser'));

  const config = {
    headers: {
    "Authorization" : `${"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNjM2MDUyNTM1LCJzdWIiOiJzZG9sYXJ0ZUBwdWNwLmVkdS5wZSIsImlzcyI6Ik1haW4iLCJleHAiOjE2MzYzOTgxMzV9.TsmkWJH9dxfzltURtiK7Mr0lA_e3PKVIXAog2B7_3Ow"}`,
    }
  };

  //console.log(config);
  return config;
  //return `Bearer ${newToken.token}`;  //Bearer si se utiliza dicha cabecera - de autenticacion
}

const getUser = () => {
  const newUser = JSON.parse(window.localStorage.getItem('loggedUser').token);//Obtenemos el id del user almacenado
  console.log(newUser.user);

  return newUser.user;
  //return `Bearer ${newToken.token}`;  //Bearer si se utiliza dicha cabecera - de autenticacion
}

//const renewimToken -- Por si se implementa

const deleteToken = () => {
  window.localStorage.removeItem('loggedUser');
}

const verifyAuthentication = Request => {
  if(!Request)  {
    console.log("Se envia al login")
    return false;
  }
  return true;
}

export default { setToken , getToken, deleteToken, verifyAuthentication}