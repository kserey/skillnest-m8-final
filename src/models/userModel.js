const users = [];

const getAll = () => {
    return users;
};

const getById = (id) => {
    return users.find(user => user.id === id);
};

const findByEmail = (email) => {
    return users.find(user => user.email === email);
};

const create = (userData) => {
    users.push(userData);
    return userData;
};

const update = (id, updatedData) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedData };
        return users[index];
    }
    return null;
};

const remove = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return null;
};

module.exports = {
    getAll,
    getById,
    findByEmail,
    create,
    update,
    remove
};