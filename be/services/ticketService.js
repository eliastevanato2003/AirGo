const ticketModel = require("../models/ticketModel");

exports.getTickets = async (id, user, flight, row, col, clas) => await ticketModel.getTickets(id, user, flight, row, col, clas);

exports.newTicket = async (user, flight, name, surname, dob, clas, nextrabag, row, col, nseat, chseat, price) => await ticketModel.newTicket(user, flight, name, surname, dob, clas, nextrabag, row, col, nseat, chseat, price);

exports.deleteTicket = async (id) => await ticketModel.deleteTicket(id);