'use strict';

const Books = require("../../db/index").models.Books;
const Authors = require("../../db/index").models.Authors;
const Publishers = require("../../db/index").models.Publishers;
const BooksAuthors = require("../../db/index").models.BooksAuthors;

//API нарушающее REST требование к простоте и единообразию интерфейса
//нарушается за счет предоставления сложноструктурированных данных на запросы к API
module.exports = router => {
  router
    .route('/authors')
    .get((req, res) => {
      //include вложений быть не должно, при создании RESTfull API
      Authors
        .findAll({
          include: {  
            model: BooksAuthors,
            attributes: ["id"],
            include:
              {
                model: Books,
                attributes: ["id", "name", "description", "price", "pages"],
                include: {
                  model: Publishers,
                  attributes: ["id", "name", "address"]
                },
              }
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
        .then(result => {
          res.status(200).send(`Author added. Id is ${result.id}.`)
        })
        .catch(err => {
          res.send(err);
        })
    })

  router
    .route('/authors/:id')
    .get((req, res) => {
      Authors
        .findOne({
          where: { id: req.params.id },
          include: {
            model: BooksAuthors,
            attributes: ["id"],
            include:
              {
                model: Books,
                attributes: ["id", "name", "description", "price", "pages"],
                include: {
                  model: Publishers,
                  attributes: ["id", "name", "address"]
                },
              }
          },
          attributes: ["id", "name", "biography"]
        })
        .then(result => {
          res.send(result);
        })
    })
    .patch((req, res) => {
      Authors
        .update(req.body, { where: { id: req.params.id } })
        .then(result => {
          res.status(200).send(`Author at id:${req.params.id} updated.`)
        })
        .catch(err => {
          res.send(err);
        })
    })
    .delete((req, res) => {
      Authors
        .destroy({ where: { id: req.params.id } })
        .then(result => {
          res.status(200).send(`Author at id:${req.params.id} deleted.`)
        })
        .catch(err => {
          res.send(err);
        })
    })
};