import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleItem } from '../../useCases/item/Handle'
import { Delete } from '../../useCases/s3/lib/delete'

export class DeleteController {
    async handle(req: Request, res: Response){
        const responses = new Responses()
        try {
            const { id } = req.params
            const handleItem = new HandleItem()
            const s3Delete = new Delete()
            const dataS3delete = await s3Delete.execute(id)
            if(!dataS3delete.error){
                await handleItem.delete(id as string);
                return responses.res200(res, null, "Item deletado com sucesso.");
            } else {
                await handleItem.delete(id as string);
                return responses.InternalError(res, "Erro ao deletar foto do s3.")
            }
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