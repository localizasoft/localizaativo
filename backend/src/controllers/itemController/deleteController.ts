import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleItem } from '../../useCases/item/Handle'

export class DeleteController {
    async handle(req: Request, res: Response){
        const responses = new Responses()
        try {
            const { id } = req.params
            const handleItem = new HandleItem()
            await handleItem.delete(id as string);
            return responses.res200(res, null, "Item deletado com sucesso.");
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return responses.NotFound(res, "Item não encontrado.")
                } else {
                    return responses.InternalError(res)
                }
            }
        }
    }
}