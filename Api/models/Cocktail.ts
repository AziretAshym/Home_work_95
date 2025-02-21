import mongoose, { HydratedDocument } from "mongoose";
import { CocktailFields } from "../types";

const Schema = mongoose.Schema;

const CocktailSchema = new Schema<HydratedDocument<CocktailFields>>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  image: {
    type: String,
  },
  recipe: {
    type: String,
    required: [true, "Recipe is required"],
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
    },
  ],
  isPublished: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;
