import api_axios from "./axiosConfig";

// GET /api/message-contact
//messageContactRoute.get('/message-contact', messageContactController.findAll);

export async function findAll() {
    return api_axios
        .get(`/message-contact`)
        .then(function (res) {
            // console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// POST /api/message-contact
// messageContactRoute.post('/message-contact', messageContactController.create);
export async function create(contactData) {
    return api_axios
        .post(`/message-contact`, contactData)
        .then(function (res) {
            // console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

// PATCH /api/message-contact/:idMessageContact
// messageContactRoute.patch('/message-contact/:id', messageContactController.update);

export async function update(id, status) {
    return api_axios
        .patch(`/message-contact/${id}`, { status })
        .then(function (res) {
            // console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
// DELETE /api/genre/:idMessage-Contact
//messageContactRoute.delete('/message-contact/:id', messageContactController.delete)

export async function deleteMessage(id) {
    return api_axios
        .delete(`/message-contact/${id}`)
        .then(function (res) {
            // console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
