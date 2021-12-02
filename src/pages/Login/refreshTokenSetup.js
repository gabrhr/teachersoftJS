export const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600-5*60)*1000;
    
    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        /* que hace esto? pedir nuevo token en expires_in o 600 segundos ? */
        refreshTiming = (newAuthRes.expires_in || 3600-5*60)*1000;
      // console.log('newAuthRes:',newAuthRes);
        // saveUserToken(newAuthRes.access_token);
      // console.log('new auth token', newAuthRes.id_token);
        setTimeout(refreshToken,refreshTiming);
    }
    setTimeout(refreshToken,refreshTiming);
}