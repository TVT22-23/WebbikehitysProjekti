import { effect, signal } from "@preact/signals-react";


//token tallennetaan session storageen
function getSessionToken() {
    const t = sessionStorage.getItem('token');
    console.log(t)
    console.log('sakset')
    return t===null || t==='null' ? '' :t;
}


//token haetaan session storagesta
export const jwtToken = signal(getSessionToken());


//aina kun jwtToken muuttuu, päivitetään sen arvo session storagessa 
effect(() => {
    sessionStorage.setItem('token', jwtToken.value);
});
