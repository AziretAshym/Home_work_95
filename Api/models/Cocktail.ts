import mongoose, {HydratedDocument} from "mongoose";
import {CocktailFields, Ingredient} from "../types";

const Schema = mongoose.Schema;

const IngredientSchema = new Schema<Ingredient>({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
});

const CocktailSchema = new Schema<HydratedDocument<CocktailFields>>({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    image: {
        type: String,
    },
    recipe: {
        type: String,
        required: [true, 'Recipe is required'],
    },
    ingredients: {
        type: [IngredientSchema],
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;