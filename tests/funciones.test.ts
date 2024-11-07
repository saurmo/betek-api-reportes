import { restar, sumar, UserController } from "../src/application/funciones"

describe("Pruebas método sumar", () => {

    test('Método de sumar 2 números generando una suma correcta', () => {
        const numA = 2
        const numB = 2
        const resultadoObtenido = sumar(numA, numB)
        const resultadoExperado = 4
        expect(resultadoObtenido).toBe(resultadoExperado)
    })

    test('Método de sumar 2 números genera un undefined con un parametro NaN', () => {
        const numA = NaN
        const numB = 2
        const resultadoObtenido = sumar(numA, numB)
        const resultadoExperado = undefined
        expect(resultadoObtenido).toBe(resultadoExperado)
    })


    test('Método de sumar 2 números genera un error cuando se ingresa el primer número negativo', () => {
        const numA = -3
        const numB = 2
        expect(() => sumar(numA, numB)).toThrow("No puede ingresar negativos")
    })

})

describe("Pruebas del método restar", () => {
    test('Restar 2 números generando una operación correcta', () => {
        const numA = 2
        const numB = 2
        const resultadoObtenido = restar(numA, numB)
        const resultadoExperado = 0
        expect(resultadoObtenido).toBe(resultadoExperado)
    })

})

describe("Pruebas de la clase UserController", () => {
    test('Crear una instancia de tipo UserController', () => {
        const userController = new UserController()
        expect(userController).toBeInstanceOf(UserController)
    })

})

