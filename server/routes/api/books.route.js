'use strict';

const Books = require("../../db/index").models.Books;
const Authors = require("../../db/index").models.Authors;
const Publishers = require("../../db/index").models.Publishers;
const BooksAuthors = require("../../db/index").models.BooksAuthors;

//API максимально приближенное к RESTfull требованиям
module.exports = router => {
  router
    .route('/books')
    .get((req, res) => {
      Books
        .findAll({
          attributes: ["id", "name", "description", "price", "pages", "publisherId"]
        })
        .then(result => {
          res.send(result);
        })
    })
    .post((req, res) => {
      Books
        .create(req.body)
        .then(result => {
          res.status(200).send(`Book added. Id is ${result.id}.`)
        })
        .catch(err => {
          res.send(err);
        })
    })

  router
    .route('/books/:bookId')
    .get((req, res) => {
      Books
        .findOne({
          where: { id: req.params.bookId },
          include: {
            model: Publishers,
            attributes: ["id", "name", "address"]
          },
          attributes: ["id", "name", "description", "price", "pages"]
        })
        .then(result => {
          res.send(result);
        })
    })
    .patch((req, res) => {
      Books
        .update(req.body, { where: { id: req.params.bookId } })
        .then(result => {
          res.status(200).send(`Book at id:${req.params.bookId} updated.`)
        })
        .catch(err => {
          res.send(err);
        })
    })
    .delete((req, res) => {
      Books
        .destroy({ where: { id: req.params.bookId } })
        .then(result => {
          res.status(200).send(`Book at id:${req.params.bookId} deleted.`)
        })
        .catch(err => {
          res.send(err);
        })
    })

  router
    .route('/books/:bookId/authors/')
    .get((req, res) => {
      Authors
        .findAll({
          include: {
            model: BooksAuthors,
            attributes: [],
            where: { bookId: req.params.bookId }
          },
          attributes: ["id", "name", "biography"]
        })
        .then(result => {
          res.send(result);
        })
    })
    .post((req, res) => {
      Authors
        .create(req.body)
        .then(author => {
          BooksAuthors
            .create({ bookId: req.params.bookId, authorId: author.id })
            .then(result => {
              res.status(200).send(`Author for book ${req.params.bookId} added. It's ID is ${author.id}.`)
            })
        })
        .catch(err => {
          res.send(err);
        })
    });

  router
    .route('/books/:bookId/publisher/')
    .get((req, res) => {
      Publishers
        .findAll({
          attributes: ["id", "name", "address"]
        })
        .then(result => {
          res.send(result);
        })
    });

  router
    .route('/books/:bookId/authors/:authorId')
    .get((req, res) => {
      Authors
        .findOne({
          include: {
            model: BooksAuthors,
            attributes: [],
            where: { bookId: req.params.bookId }
          },
          attributes: ["id", "name", "biography"],
          where: { id: req.params.authorId }
        })
        .then(result => {
          res.send(result);
        })
    })
    .delete((req, res) => {
      BooksAuthors
        .destroy({ where: { bookId: req.params.bookId, authorId: req.params.authorId } })
        .then(result => {
          res.status(200).send(`Author with ID:${req.params.authorId} for book with ID:${req.params.bookId} was deleted.`)
        })
        .catch(err => {
          res.send(err);
        })
    })
};