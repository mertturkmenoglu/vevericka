import { Injectable } from "@nestjs/common";
import { NewRecipeInput } from "./dto/new-recipe.input";
import { RecipesArgs } from "./dto/recipes.args";
import { Recipe } from "./models/recipe.model";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Recipe> {
    return {} as any;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    const res = await this.prisma.tag.findMany();
    console.log(res);
    return [] as Recipe[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
