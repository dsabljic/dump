class Uredaj {
    constructor(id, naziv, vrsta, tezina, datumKupovine) {
        this.id = id;
        this.naziv = naziv;
        this.vrsta = vrsta;
        this.tezina = tezina;
        this.datumKupovine = datumKupovine;
    }
}

class Lokacija {
    constructor(id, naziv, adresa, gpsSirina, gpsDuzina, vrsta) {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;
        this.gpsSirina = gpsSirina;
        this.gpsDuzina = gpsDuzina;
        this.vrsta = vrsta;
    }
}

function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

function getRandomVrsta() {
    const types = ["Ured", "Skladište", "Prodajni Centar", "Servis", "Data Centar"];
    return types[Math.floor(Math.random() * types.length)];
}

function ispis(niz) {
    niz.forEach((obj) => {
        console.log(`Prototip objekta: ${Reflect.getPrototypeOf(obj).constructor.name}`);
        Reflect.ownKeys(obj).forEach(key => {
            console.log(`${key}: ${Reflect.get(obj, key)}`);
        });
        console.log('');
    });
}
let svastara = [];

// ---------- 1. ----------
console.log('---------- 1. ----------')

const uredaji = [];
const lokacije = [];

for (let i = 1; i <= 10; i++) {
    uredaji.push(new Uredaj(
        i,
        `Uredaj ${i}`,
        "Periferija",
        parseFloat((Math.random() * 5 + 1).toFixed(2)),
        generateRandomDate(new Date(2020, 0, 1), new Date(2023, 0, 1))
    ));

    lokacije.push(new Lokacija(
        i,
        `Lokacija ${i}`,
        `Adresa ${i}`,
        parseFloat((Math.random() * 5 + 43).toFixed(4)),
        parseFloat((Math.random() * 5 + 15).toFixed(4)),
        getRandomVrsta()
    ));
}


for (let i = 0; i < 30; i++) {
    let rnd = Math.floor(Math.random() * 18);
    if (rnd % 2 !== 0) {
        svastara.push(uredaji[rnd % 10]);
    } else {
        svastara.push(lokacije[rnd % 10]);
    }
}

ispis(svastara)

// ---------- 2. ----------
console.log('---------- 2. ----------')

const uredaji2 = []
const lokacije2 = []
svastara = []

for (let i = 1; i <= 10; i++) {
    uredaji2.push([
        i,
        `Uredaj ${i}`,
        "Periferija",
        parseFloat((Math.random() * 5 + 1).toFixed(2)),
        generateRandomDate(new Date(2020, 0, 1), new Date(2023, 0, 1))
    ]);

    lokacije2.push([
        i,
        `Lokacija ${i}`,
        `Adresa ${i}`,
        parseFloat((Math.random() * 5 + 43).toFixed(4)),
        parseFloat((Math.random() * 5 + 15).toFixed(4)),
        getRandomVrsta()
    ]);
}

for (let i = 0; i < 30; i++) {
    let rnd = Math.floor(Math.random() * 18);
    let data, obj;
    
    if (rnd % 2 !== 0) {
        data = uredaji2[rnd % 10];
        obj = Reflect.construct(Uredaj, data);
    } else {
        data = lokacije2[rnd % 10];
        obj = Reflect.construct(Lokacija, data);
    }
    
    svastara.push(obj);
}

ispis(svastara)

// ---------- 3. ----------
console.log('---------- 3. ----------')

class UredajLokacija {
    constructor(uredaj, lokacija) {
        Reflect.ownKeys(uredaj).forEach(key => {
            this[key] = uredaj[key];
        });
        Reflect.ownKeys(lokacija).forEach(key => {
            this[key] = lokacija[key];
        });
    }
}

const uredaji3 = [];
const lokacije3 = [];
svastara = []

for (let i = 1; i <= 10; i++) {
    uredaji3.push(new Uredaj(
        i,
        `Uredaj ${i}`,
        "Periferija",
        parseFloat((Math.random() * 5 + 1).toFixed(2)),
        generateRandomDate(new Date(2020, 0, 1), new Date(2023, 0, 1))
    ));

    lokacije3.push(new Lokacija(
        i,
        `Lokacija ${i}`,
        `Adresa ${i}`,
        parseFloat((Math.random() * 5 + 43).toFixed(4)),
        parseFloat((Math.random() * 5 + 15).toFixed(4)),
        getRandomVrsta()
    ));
}

for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * 10);
    const uredaj = uredaji[index];
    const lokacija = lokacije[index];
    const uredajLokacija = Reflect.construct(UredajLokacija, [uredaj, lokacija]);
    svastara.push(uredajLokacija);
}

ispis(svastara)
