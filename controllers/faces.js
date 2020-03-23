const handleFaces = (req, res, db) => {
    const {id, facesFound} = req.body;
    db('users').where('id', '=', id)
    .increment('faces', facesFound)
    .returning('faces')
    .then(faces => {
        res.json(faces[0]);
    })
    .catch(err => res.status(400).json('unable to get faces'))
}

module.exports = {
    handleFaces: handleFaces
}