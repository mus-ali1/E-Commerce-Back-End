const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { sync } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    try {
        const productDataAll = await Tag.findAll({
            include: [
                { model: Product, through: ProductTag },
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
                { model: Product, through: ProductTag },
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
        console.log(err)
        res.status(500).json(err);
    }


});

router.post('/', async (req, res) => {
    // create a new tag
    try {
        const tagData = await Tag.create(req.body);
        res.status(200).json(["A category created as follows:", tagData]);
    } catch (err) {
        res.status(400).json(err);
    }

});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value
    try {
        const tagDataById = await Tag.findByPk(req.params.id);
        if (!tagDataById) {
            res.status(404).json({
                message: `No Tag found with id :${req.params.id} to update!`,
            });
            return;
        }
        Tag.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.json(["The following Tag is updated:", tagDataById]);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    try {
        const tagDataById = await Tag.findByPk(req.params.id);
        if (!tagDataById) {
            res.status(404).json({
                message: `No Tag found with id :${req.params.id} to delete!`,
            });
            return;
        }

        await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.json(["The following Tag is deleted:", tagDataById]);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

module.exports = router;
