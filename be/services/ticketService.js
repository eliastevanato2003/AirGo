const ticketModel = require("../models/ticketModel");

exports.getTickets = async (id, user, flight) => await ticketModel.getTickets(id, user, flight);

exports.newTicket = async (user, flight, name, surname, dob, clas, nextrabag, row, col, nseat) => await ticketModel.newTicket(user, flight, name, surname, dob, clas, nextrabag, row, col, nseat);

exports.deleteTicket = async (id) => await ticketModel.deleteTicket(id);