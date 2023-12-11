import { effect, signal } from "@preact/signals-react";


//token tallennetaan session storageen
function getSessionToken() {
    const t = sessionStorage.getItem('token');
    return t===null || t==='null' ? '' :t;
}


//token haetaan session storagesta
export const jwtToken = signal(getSessionToken());


//aina kun jwtToken muuttuu, päivitetään sen arvo session storagessa 
effect(() => {
    sessionStorage.setItem('token', jwtToken.value);
});

//accountId tallennetaan session storageen
function getSessionAccountID() {
    const a = sessionStorage.getItem('accountId');
    return a===null || a==='null' ? '' :a;
}


//accountId haetaan session storagesta
export const accountId = signal(getSessionAccountID());


//aina kun accountId muuttuu, päivitetään sen arvo session storagessa 
effect(() => {
    sessionStorage.setItem('accountId', accountId.value);
});

