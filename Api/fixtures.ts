import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import Cocktail from "./models/Cocktail";

const run = async () => {
    await mongoose.connect(config.db);
    const db =mongoose.connection;
    
    try {
        await db.dropCollection('users');
        await db.dropCollection('cocktails');
    } catch (e) {
        console.log('Collections were not present');
    }

    const [barman_1, barman_2] = await User.create(
        {
            email: "qwerty@gmail.com",
            displayName: "Qwerty",
            password: "qwerty",
            avatar: "fixtures/barman1.jpeg",
            role: "admin",
            token: randomUUID()
        },
        {
            email: "test@gamil.com",
            displayName: "Test",
            password: "test",
            avatar: "fixtures/barman2.jpeg",
            role: "user",
            token: randomUUID()
        },
    )

    await Cocktail.create(
        {
            user: barman_1,
            title: "Sex on the beach",
            image: "fixtures/SexOnTheBeach.jpeg",
            recipe: "Synonymous with summer itself, recreate the classic sun-drenched cocktail - wherever you are - with a sweet and fruity mixture of vodka, peach schnapps, cranberry and orange juice.",
            ingredients: [
                {
                    name: "Ice",
                    amount: "1",
                },
                {
                    name: "Vodka",
                    amount: "50 ml",
                },
                {
                    name: "Oranges",
                    amount: "2 slices",
                },
                {
                    name: "Cranberry juice",
                    amount: "50 ml",
                },
                {
                    name: "Glacé cherries",
                    amount: "Optional",
                },
            ],
            isPublished: true,
        },
        {
            user: barman_1,
            title: "Negroni",
            image: "fixtures/Negroni.jpeg",
            recipe: "Dark and delicious, the classic negroni has just three key ingredients and is a staple on all good cocktail menus. Simply mix together equal parts gin, vermouth and campari for a boozy taste sensation. This punchy, slightly bitter drink is our ideal dinnertime aperativo. Feeling daring? Try one of our delicious variations, like our softer sherry negroni or a prosecco-topped negroni sbagliato.",
            ingredients: [
                {
                    name: "Gin",
                    amount: "25 ml",
                },
                {
                    name: "Sweet vermouth",
                    amount: "25 ml",
                },
                {
                    name: "Campari",
                    amount: "25 ml",
                },
                {
                    name: "ice",
                    amount: "1",
                },
            ]
        },
        {
            user: barman_2,
            title: "Old fashioned",
            image: "fixtures/OldFashioned.jpeg",
            recipe: "One for the more refined palettes out there, whisky, bitters, soda water and orange zest combine to create a heady mix that's best served over plenty of ice. Discover more whisky cocktails.",
            ingredients: [
                {
                    name: "Sugar",
                    amount: "2 tsp",
                },
                {
                    name: "Bitter",
                    amount: "1-2 dashes",
                },
                {
                    name: "Scotch whisky",
                    amount: "60 ml",
                },
                {
                    name: "soda water",
                    amount: "Optional",
                },
                 {
                    name: "Orange",
                    amount: "1 Slice",
                },
            ]
        },
        {
            user: barman_2,
            title: "Porn Star Martini",
            image: "fixtures/PornStarMartini.jpeg",
            recipe: "A relatively new addition to Liquor.com, the Porn Star Martini immediately became one of our most popular recipes. It's a crowd-pleasing mix of vanilla and passionfruit flavors, and the Champagne chaser does't hurt.",
            ingredients: [
                {
                    name: "Vanilla vodka",
                    amount: "1/2 ounces",
                },
                {
                    name: "Passion fruit liqueur ",
                    amount: "1/2 ounce",
                },
                {
                    name: "Passion fruit puree",
                    amount: "1 ounce",
                },
                {
                    name: "Lime juice",
                    amount: "1/2 ounce",
                },
                {
                    name: "Vanilla simple syrup",
                    amount: "1/2 ounce",
                },
                {
                    name: "Sparkling wine",
                    amount: "2 ounce",
                },
            ],
            isPublished: true,
        },
    )
    await mongoose.disconnect();
};
run().catch(console.error);
