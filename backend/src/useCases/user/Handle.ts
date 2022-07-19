import { prismaClient } from "../../../prisma/prismaClient";
import { User } from "../../entities/Classes/User";
import { PasswordHash } from "../../providers/passwordHash";
import { Validations } from "../../providers/validations";
import { IHandleUser } from "./IHandleUser";

export class HandleUser implements IHandleUser {
    async getUsers() {
        const userList: User[] = []

        const usersDatabase = await prismaClient.user.findMany()
    
        usersDatabase.forEach(element => {
            userList.push(element as User)
        });

        return userList;
    }

    async deleteUser(id: string) {
        await prismaClient.user.delete({
            where: {
                id
            }
        })
    }

    async getUserById(id: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                id
            }
        })

        return user;
    }

    async verifyIfAlreadyExist(email: string) {
        const userDatabase = await prismaClient.user.findFirst({
            where: {
                email
            }
        })
        
        const user = new User(userDatabase as User)

        return user;
    }

    async postUser(email: string, password: string, confirmPassword: string) {
        const validations = new Validations()
        const cryptograph = new PasswordHash()
        const password_hash = await cryptograph.createHash(password)
        const cannotBeCreated = await validations.validateUser(email, password, confirmPassword)

        const verifyIfAlreadyExist = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (verifyIfAlreadyExist) {
            return {
                error: true,
                code: 406,
                message: "Usuário já existente."
            }
        }

        if (cannotBeCreated.error) {
            return {
                error: true,
                message: cannotBeCreated.message,
                code: 406
            }
        }

        const createdUser = await prismaClient.user.create({
            data: {
                email,
                password_hash
            }
        })

        const newUser = new User(createdUser as User)

        return {
            error: false,
            message: "Usuário criado com sucesso.",
            data: newUser,
            code: 200
        }
    }

    async putUser(id: string, email: string) {
        const validations = new Validations()

        const emailIsValid = await validations.emailValidate(email)
        const fieldsValidation = await validations.userFieldsValidation(email, 'password')

        if(emailIsValid && fieldsValidation){
            const updatedUserDatabase = await prismaClient.user.update({
                where: {
                    id
                },
                data: {
                    email
                }
            })

            const updatedUser = new User(updatedUserDatabase as User)

            return {
                error: false,
                code: 200,
                message: 'Usuário alterado com sucesso.',
                data: updatedUser
            }
        }

        return {
            error: true,
            code: 406,
            message: "Campos inválidos, favor revisar se nome está preenchido e se o email é válido."
        }
    }
}