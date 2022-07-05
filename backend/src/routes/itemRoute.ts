import { Router } from "express";
import { DeleteController } from "../controllers/itemController/deleteController";
import { GetAllItemsController } from "../controllers/itemController/getAllItemsController";
import { GetItemByIdController } from "../controllers/itemController/getItemByIdController";
import { PhotoController } from "../controllers/itemController/photoAddController";
import { PostController } from "../controllers/itemController/postController";
import { PutController } from "../controllers/itemController/putController";

const itemRoute = Router()

const getAllItems = new GetAllItemsController()
const getItemById = new GetItemByIdController()
const deleteItem = new DeleteController()
const postItem = new PostController()
const putItem = new PutController()
const photoController = new PhotoController()

itemRoute.get("/api/item/getall", getAllItems.handle)
itemRoute.get("/api/item/getById/:id", getItemById.handle)

itemRoute.delete("/api/item/delete/:id", deleteItem.handle)

itemRoute.post("/api/item/post", postItem.handle)

itemRoute.put("/api/item/put/:id", putItem.handle)
itemRoute.put("/api/item/addPhoto/:id", photoController.handle)
export { itemRoute }