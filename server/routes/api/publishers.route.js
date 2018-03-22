'use strict';

const Books = require("../../db/index").models.Books;
const Authors = require("../../db/index").models.Authors;
const Publishers = require("../../db/index").models.Publishers;
const BooksAuthors = require("../../db/index").models.BooksAuthors;

//API нарушающее REST требование к простоте и единообразию интерфейса
//нарушается за счет предоставления сложноструктурированных данных на запросы к API
module.exports = router => {
  router
    .route('/publishers')
    .get((req, res) => {
      //include вложений быть не должно, при создании RESTfull API
      Publishers
        .findAll({
          attributes: ["id", "name", "address"],
          include: {
            model: Books,
            attributes: ["id", "name", "description", "price", "pages"],
            include:
              {
                model: BooksAuthors,
                attributes: ["id"],
                include: {
                  model: Authors,
                  attributes: ["id", "name", "biography"]
                },
              }
          }
        })
        .then(result => {
          res.send(result);
        })
    })
    .post((req, res) => {
      Publishers
        .create(req.body)
        .then(result => {
          res.status(200).send(`Author added. Id is ${result.id}.`)
        })
        .catch(err => {
          res.send(err);
        })
    })

  router
    .route('/publishers/:id')
    .get((req, res) => {
      Publishers
        .findOne({
          where: { id: req.params.id },
          attributes: ["id", "name", "address"],
          include: {
            model: Books,
            attributes: ["id", "name", "description", "price", "pages"],
            include:
              {
                model: BooksAuthors,
                attributes: ["id"],
                include: {
                  model: Authors,
                  attributes: ["id", "name", "biography"]
                },
              }
          }
        })
        .then(result => {
          res.send(result);
        })
    })
    .patch((req, res) => {
      Publishers
        .update(req.body, { where: { id: req.params.id } })
        .then(result => {
          res.status(200).send(`Publisher at id:${req.params.id} updated.`)
        })
        .catch(err => {
          res.send(err);
        })
    })
    .delete((req, res) => {
      Publishers
        .destroy({ where: { id: req.params.id } })
        .then(result => {
          res.status(200).send(`Publisher at id:${req.params.id} deleted.`)
        })
        .catch(err => {
          res.send(err);
        })
    })
};