const Contact = require('../models/contact');
const contactRouter = require('express').Router();
const logger = require('../utils/logger')


contactRouter.get('/', (request, response) => {
    Contact.find({})
        .then(result => {
            if (result.length === 0) {
                response.send({
                    error: 'No contacts found',
                    success: false,
                    data: result
                })
                response.status(404).end()
            } else {
                const contacts = result.map(contact => {
                    return {
                        name: contact.name,
                        phone: contact.phone
                    }
                })

                response.status(200).send(contacts)
            }
        }).catch(error => {
            logger.info(error)
        })
})

contactRouter.get('/:name', (request, response, next) => {
    const name = request.params.name;

    Contact.find({ name: name }).then(contact => {
        response.status(200).send(`${contact[0].name} ${contact[0].phone}`)
    }).catch(error => next(error))
})

contactRouter.get('/info', (request, response) => {
    const date = new Date().toLocaleDateString();
    Contact.countDocuments({})
        .then(count => {
            const str = `<h2>Date ${date}</h2>
            Persons: ${count}`;
            response.send(str);
        })
        .catch(err => {
            logger.info(err);
            response.status(400);
        });
})



contactRouter.delete('/:name', (request, response, next) => {
    const name = request.params.name;
    Contact.findOneAndDelete({ name: name }).then(contact => {
        response.status(200).send({
            success: true,
            messaje: `${contact.name} deleted`
        })
    }).catch(error => next(error));
})

contactRouter.post('/', (request, response) => {
    const body = request.body;
    const contact = new Contact({
        name: body.name,
        phone: body.phone
    })

    contact.save().then(() => {
        response.status(201).send({
            success: true,
            messaje: 'Contact created',
        })
    }).catch(error => {
        response.status(400).send({
            success: false,
            messaje: 'Contact not created',
            error: error
        })
    })
})


contactRouter.patch('/:name', (request, response) => {
    const body = request.body;

    Contact.findOneAndUpdate({ name: body.name }, body, { new: true })
        .then(contact => {
            if (!contact) return response.status(404).send({ success: false, messaje: 'Contact not found' });

            logger.info('Usuario actualizado:', contact);
            response.status(200).json(contact);
        })
        .catch(error => {
            logger.error(error);
            response.status(400);
        })
})

module.exports = contactRouter;
