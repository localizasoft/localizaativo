import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { prismaClient } from '../../../prisma/prismaClient'
import { PasswordHash } from '../../services/passwordHash'
import { SendEmailService } from '../../services/sendEmailRegisterUser'
import { Validations } from '../../services/validations'
import { env } from 'process'
import { Prisma } from '@prisma/client'
import { HandleUser } from '../../useCases/user/Handle'
import { GenerateCode } from '../../services/generateCode'
import { HandleUserCode } from '../../useCases/user_code/Handle'

export class RegisterNewUser {
    private handleUser: HandleUser = new HandleUser()
    private handleCode: HandleUserCode = new HandleUserCode()

    async sendCode(req: Request, res: Response) {
        try {
            const { email } = req.body

            const user = await this.handleUser.verifyIfAlreadyExist(email)

            if (user) {
                return res.status(406).json({
                    error: true,
                    message: "Email já registrado"
                })
            }

            const validation = new Validations()
            const emailService = new SendEmailService()
            const cryptograph = new PasswordHash()

            const emailIsValid = validation.emailValidate(email);
            if (!emailIsValid) return res.status(406).json({
                error: true,
                message: 'Email inválido.'
            })

            const code = await GenerateCode()

            const emailInfo = await emailService.sendCode(email, code);

            await this.handleCode.deleteRegisterCodes(email)

            if (!emailInfo.error) {
                const cryptographedCode = await cryptograph.createHash(code)

                const bd_code = await this.handleCode.registerUserCode(email, cryptographedCode)

                return res.status(200).json({
                    error: false,
                    message: "Email enviado.",
                    data: emailInfo.data
                })
            } else {
                return res.status(500).json({
                    error: true,
                    message: emailInfo.message,
                    data: emailInfo.data
                })
            }
        } catch (e) {
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: e
            });
        }
    }

    async codeVerify(req: Request, res: Response) {
        try {
            const { code, email } = req.body

            const codeValidation = await this.handleCode.verifyCode(email, code)

            if (codeValidation.valid) {
                return res.status(200).json({
                    error: false,
                    message: codeValidation.token
                })
            }
            return res.status(406).json({
                error: true,
                message: "Código inválido."
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(406).json({
                        error: true,
                        message: "Email já cadastrado."
                    });
                }
            }
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: error
            })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword } = req.body
            const validations = new Validations()
            const cryptograph = new PasswordHash()
            const password_hash = await cryptograph.createHash(password)
            const cannotBeCreated = await validations.validateUser(email, password, confirmPassword)

            const verifyIfAlreadyExist = await this.handleUser.verifyIfAlreadyExist(email)

            if (verifyIfAlreadyExist) {
                return res.status(406).json({
                    error: true,
                    message: "Email já registrado"
                })
            }

            if (cannotBeCreated.error) {
                return res.status(406).json({
                    error: true,
                    message: cannotBeCreated.message
                })
            }

            const createdUser = await prismaClient.user.create({
                data: {
                    email,
                    password_hash
                }
            })

            return res.status(200).json({
                error: false,
                message: "Usuário criado com sucesso.",
                data: createdUser
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(406).json({
                        error: true,
                        message: "Email já cadastrado."
                    });
                }
            }
            return res.status(500).json({
                error: true,
                message: "Erro interno de servidor, favor contate o suporte.",
                data: error
            })
        }
    }
}