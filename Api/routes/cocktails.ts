import express from "express";
import {imagesUpload} from "../multer";
import Cocktail from "../models/Cocktail";
import auth from "../middleware/auth";
import User from "../models/User";
import permit from "../middleware/permit";
import mongoose from "mongoose";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (_req, res, next) => {
    try {
        const cocktails = await Cocktail.find();
        res.send(cocktails);
    } catch (e) {
        next(e)
    }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
    const cocktailId = req.params.id;
    try {
        const cocktail = await Cocktail.findById(cocktailId);
        res.send(cocktail);
    } catch (e) {
        next(e)
    }
});



cocktailsRouter.post('/add-new-cocktail', imagesUpload.single('image'), async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).send({ error: 'No token provided' });
        return;
    }

    const user = await User.findOne({ token });
    if (!user) {
        res.status(401).send({ error: 'Wrong token' });
        return;
    }

    let ingredients = [];
    if (req.body.ingredients) {
        if (Array.isArray(req.body.ingredients)) {
            ingredients = req.body.ingredients;
        } else {
            res.status(400).send({ error: 'Ingredients should be an array' });
            return;
        }
    }

    const newCocktail = new Cocktail({
        user: user._id,
        title: req.body.title,
        image: req.file ? `images/${req.file.filename}` : null,
        recipe: req.body.recipe,
        ingredients,
    });

    try {
        await newCocktail.save();
        res.status(201).send({ message: 'Cocktail created successfully', cocktail: newCocktail });
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res, next) => {
    const cocktailId = req.params.id;
    try {

        if (!mongoose.isValidObjectId(cocktailId)) {
            res.status(400).send({ error: 'Invalid cocktail ID' });
            return;
        }

        const cocktail = await Cocktail.findById(cocktailId);

        if (!cocktail) {
            res.status(404).send({ error: 'Cocktail not found' });
            return;
        }

        cocktail.isPublished = !cocktail.isPublished;
        await cocktail.save();

        res.send({ message: 'Cocktail publication status updated'});
    } catch (e) {
        next(e);
    }
})

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktailId = req.params.id;

        if (!mongoose.isValidObjectId(cocktailId)) {
            res.status(400).send({ error: 'Invalid cocktail ID' });
            return;
        }

        const cocktail = await Cocktail.findById(cocktailId);

        if (!cocktail) {
            res.status(404).send({ error: 'Cocktail not found' });
            return;
        }

        await cocktail.deleteOne();
        res.send({ message: 'Cocktail deleted successfully' });
    } catch (e) {
        next(e);
    }
});


export default cocktailsRouter;