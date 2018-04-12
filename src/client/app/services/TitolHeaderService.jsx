class TitolHeaderService {
    constructor() {
        this.titol = "";
    }

    getTitol() {
        return this.titol;
    }
    setTitol(titol) {
        this.titol = titol;
        document.getElementById("titolHeader").innerHTML = "" + titol;
    }
}

export default TitolHeaderService;