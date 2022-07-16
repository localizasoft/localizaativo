import { Request, Response } from 'express'
import { Responses } from '../../lib/response'
import { HandleChargeDataBase } from '../../useCases/chargeDataBase/Handle';

export class ChargeController {
    async handle(req: Request, res: Response){
        const responses = new Responses()
        try {
            const file = req.file;
            const handle = new HandleChargeDataBase()
            if(!file) return responses.ParamsError(res, "Arquivo vazio ou não encontrado.")
            const data = await handle.charge(file)
        } catch (e) {
            return responses.InternalError(res, "Ocorreu algum erro interno, contate o suporte.")
        }
    }
}