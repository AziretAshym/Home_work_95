import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";

const usersRouter = express.Router();

usersRouter.post('/register', imagesUpload.single('avatar'), async (req, res, next) => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        res.status(400).send({ error: 'User with this email already exists' });
        return;
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName,
        avatar: req.file ? `images/${req.file.filename}` : undefined,
    });

    try {
        user.generateToken();
        await user.save();
        res.send({user, message: "User registered successfully"});
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
             res.status(400).send(error);
             return;
        }
        next(error);
    }
});


usersRouter.post('/session', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            res.status(400).send({error: 'User not found'});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Password does not match'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: "Username and password is correct", user});
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

usersRouter.delete('/session', auth, async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;

    try {
        const user = await User.findOne({_id: userFromAuth._id});
        if (user) {
            user.generateToken();
            await user.save();
            res.send({ message: "User logout successfully" });
        }
    } catch (e) {
        next(e);
    }
})

export default usersRouter;