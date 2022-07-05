import { Item } from "@prisma/client";
import { prismaClient } from "../../../prisma/prismaClient";
import { IHandleItems, PutResponse } from "./IHandleItems";

export class HandleItem implements IHandleItems {
    async getAll(): Promise<Item[]> {
        const list = await prismaClient.item.findMany()

        return list;
    }
    async delete(id: string): Promise<void> {
        await prismaClient.item.delete({
            where: {
                id
            }
        })
    }
    async getById(id: string): Promise<Item | null> {
        const item = await prismaClient.item.findUnique({
            where: {
                id
            }
        })

        return item
    }

    async post(sequencial_localiza: string, codigo_de_barras: string, plaqueta: string, andar: string, localizacao: string, descricao: string, dono: string, lido: string, tipo: string) {
        const item = await prismaClient.item.create({
            data: {
                sequencial_localiza,
                codigo_de_barras,
                plaqueta,
                andar,
                localizacao,
                descricao,
                dono,
                lido,
                tipo
            }
        })

        return item;
    }

    async put(id: string, sequencial_localiza: string, codigo_de_barras: string, plaqueta: string, andar: string, localizacao: string, descricao: string, dono: string, lido: string, tipo: string): Promise<PutResponse> {
        const item = await prismaClient.item.findFirst({
            where: {
                id
            }
        })

        if(!item){
            return {
                error: true,
                data: null,
                message: "Item não encontrado."
            }
        }

        const updatedItem = await prismaClient.item.update({
            where: {
                id
            },
            data: {
                sequencial_localiza,
                codigo_de_barras,
                plaqueta,
                andar,
                localizacao,
                descricao,
                dono,
                lido,
                tipo
            }
        })

        return {
            error: false,
            data: updatedItem
        }
    }

    async addImage(id: string, foto_url: string): Promise<PutResponse> {
        const item = await prismaClient.item.findFirst({
            where: {
                id
            }
        })

        if(!item){
            return {
                error: true,
                data: item,
                message: "Item não encontrado."
            }
        }

        const updatedItem = await prismaClient.item.update({
            where: {
                id
            },
            data: {
                foto_url
            }
        })

        return {
            error: false,
            data: updatedItem
        }
    }
}