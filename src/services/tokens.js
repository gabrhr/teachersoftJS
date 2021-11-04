

const GetTokenPrueba = () => {

  const token = JSON.parse(localStorage.getItem("token"))
  console.log(localStorage.getItem("token"))
  console.log(token);

  const config = {
    headers: {
      Authorization: `${token}`,
    }
  };

  console.log(config);
  return config;
  //return `Bearer ${newToken.token}`;  //Bearer si se utiliza dicha cabecera - de autenticacion
}

const verifyAuthentication = Request => {
  if(!Request)  {
    console.log("Se envia al login")
    return false;
  }
  return true;
}

export default { GetTokenPrueba, verifyAuthentication}