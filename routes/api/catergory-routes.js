const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    try {
        const categoryDataAll = await Category.findAll({
            include: [{ model: Product }],
            order: [["id", "ASC"]],
        });
        res.status(200).json(categoryDataAll);
    } catch (err) {
        res.status(500).json(err);
    }


});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    try {
        const categoryDataById = await Category.findByPk(req.params.id, {
            include: [{ model: Product }],
        });
        if (!categoryDataById) {
            res.status(404).json({
                message: `No category matches the requested id: ${req.params.id}`,
            });
            return;
        }
        res.status(200).json(categoryDataById);
    } catch (err) {
        res.status(500).json(err);
    }

});

router.post('/', (req, res) => {
    // create a new category
    try {
        const categorytoCreate = await Category.create(req.body);
        res.status(200).json(["A category is created as follows:", categorytoCreate]);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
});

module.exports = router;
