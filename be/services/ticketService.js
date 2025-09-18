const ticketModel = require("../models/ticketModel");

exports.getTickets = async (airline, id, user, flight, row, col, clas) => await ticketModel.getTickets(airline, id, user, flight, row, col, clas);

exports.newTicket = async (user, flight, name, surname, dob, clas, nextrabag, row, col, nseat, chseat, price) => await ticketModel.newTicket(user, flight, name, surname, dob, clas, nextrabag, row, col, nseat, chseat, price);

exports.updateTicket = async (id, name, surname, dob, nextrabag, row, col, nseat, price) => await ticketModel.updateTicket(id, name, surname, dob, nextrabag, row, col, nseat, price);

exports.deleteTicket = async (id) => await ticketModel.deleteTicket(id);