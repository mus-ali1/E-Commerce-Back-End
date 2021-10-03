const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { sync } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    try {
        const productDataAll = await Tag.findAll({
            include: [
                { model: Product, through: ProductTag, as: "productsWithThisTag" },
            ],
            order: [["id", "ASC"]],
        });
        res.status(200).json(productDataAll);
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    try {
        const tagDataById = await Tag.findByPk(req.params.id, {
            include: [
                { model: Product, through: ProductTag, as: "productsWithThisTag" },
            ],
        });

        if (!tagDataById) {
            res
                .status(404)
                .json({ message: `No tag found with id: ${req.params.id}!` });
            return;
        }

        res.status(200).json(tagDataById);
    } catch (err) {
        res.status(500).json(err);
    }

});

router.post('/', async (req, res) => {
    // create a new tag


});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
});

module.exports = router;
