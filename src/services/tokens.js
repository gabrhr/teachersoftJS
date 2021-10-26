
const setToken = ({user}) => {
  if(!window.localStorage.getItem ('loggedUser'))
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
  else
    console.log('No puede ingresar más de una vez el token')
  //let token = `Bearer ${newToken}`
}

const getToken = () => {
  const newToken = window.localStorage.getItem('loggedUser'); //Obtenemos el id del user almacenado
  return `Bearer ${newToken.token}`;  //Bearer si se utiliza dicha cabecera - de autenticacion
}

//const renewimToken -- Por si se implementa

const deleteToken = () => {
  window.localStorage.removeItem('loggedUser');
}

export default { setToken , getToken, deleteToken}