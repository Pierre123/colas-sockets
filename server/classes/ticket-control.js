const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCola = [];
        let data = require('../data/data.json');
        //console.log(data);

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimosCola;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimosCola.unshift(atenderTicket);

        if (this.ultimosCola.length > 4) {
            this.ultimosCola.splice(-1, 1); // borrar ultimo elemtno
        }

        console.log(this.ultimosCola);
        this.grabarArchivo();

        return atenderTicket;
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }



}

module.exports = {
    TicketControl
}