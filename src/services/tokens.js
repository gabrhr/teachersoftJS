
const GetTokenPrueba = () => {

  const token = JSON.parse(localStorage.getItem("token"))
  //console.log(localStorage.getItem("token"))
  //console.log(token);
  
  const config = {
    headers: {
      Authorization: `${token}`,
    // "Authorization" : `${"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzNCIsImlhdCI6MTYzNjQwNDA3MCwic3ViIjoibHBvZGVzdGFAcHVjcC5lZHUucGUiLCJpc3MiOiJNYWluIiwiZXhwIjoxNjM2NDA3NjcwfQ.D743-7kAcof_T47-TiqjPMCrXrKG_f8Ex5TGhXUnjWs"}`,
    }
  };

  //console.log(config);
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