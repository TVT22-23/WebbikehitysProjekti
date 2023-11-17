let taulu = [
    {fname : 'Elina', lname : 'Karisto'},
    {fname : 'Antti', lname : 'Kivioja'},
    {fname : 'Matti', lname : 'Raniskaaa'}
    ];


taulu = [...taulu, {fname: 'Kalle', lname: 'Kunkku'}]

taulu.forEach (p=> console.log(p.fname + " " + p.lname))

// const Uusitaulu = taulu.filter(p => p.lname.length < 8);
// const Uusitaulu = taulu.filter(p => p.lname.includes('aaa'));

// Uusitaulu.forEach ( p=> console.log(p.lname))

 //   const uusiTaulu = taulu.map(person => person.fname)

// for ( nimi of taulu){
//     console.log(nimi)
// }

// //taulu.forEach( nimi => {console.log(nimi);} )

// const uusiTaulu = taulu.map(nimi => nimi.length)

// uusiTaulu.forEach( nimi => console.log(nimi))

// const uusiTaulu = taulu.map( nimi => {
//     nimi=nimi + 'x' // jne

// })

