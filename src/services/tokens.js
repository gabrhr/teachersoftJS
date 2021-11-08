
const GetTokenPrueba = () => {

  const token = JSON.parse(localStorage.getItem("token"))
  console.log(localStorage.getItem("token"))
  console.log(token);
  
  const config = {
    headers: {
      Authorization: `${token}`,
    // "Authorization" : `${"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNjM2MDUyNTM1LCJzdWIiOiJzZG9sYXJ0ZUBwdWNwLmVkdS5wZSIsImlzcyI6Ik1haW4iLCJleHAiOjE2MzYzOTgxMzV9.TsmkWJH9dxfzltURtiK7Mr0lA_e3PKVIXAog2B7_3Ow"}`,
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

function getToken() {
  return JSON.parse(localStorage.getItem("token"))
}

export default { GetTokenPrueba, verifyAuthentication, getToken}