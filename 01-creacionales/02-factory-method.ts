/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
    prepare(): void;
}

class ChikenHamburger implements Hamburger {
    prepare(): void {
        console.log('Preparando una hamburguesa de %cpollo', COLORS.yellow);
    }
}
class BeefHamburger implements Hamburger {
    prepare(): void {
        console.log('Preparando una hamburguesa de  %cres', COLORS.brown);
    }
}

class BeanHamburguer implements Hamburger {
    prepare(): void {
        console.log('Preparando una hamburguesa con %cfrijol', COLORS.purple)
    }
}
// La clase abstracta envita que sea instanciada directamente
// Sirve como esqueleto para construir otras clases
abstract class Restaurant {
    // Sólo las clases que extienden de está clase pueden ver este método 
    protected abstract createHamburguer(): Hamburger;

    orderHamburguer(): void {
        const hamburguer = this.createHamburguer();
        hamburguer.prepare()
    }
}


class ChickenRestaurant extends Restaurant {
    override createHamburguer(): Hamburger {
        return new ChikenHamburger()
    }
}

class BeefRestaurant extends Restaurant {
    override createHamburguer(): Hamburger {
        return new BeefHamburger()
    }
}

class BeanRestaurant extends Restaurant {
    override createHamburguer(): Hamburger {
        return new BeanHamburguer();
    }

}

function main() {
    let restaurant: Restaurant;
    const burgerType = prompt('Qué tipo de hamburguesa quieres? Chiken / Beef / Bean ? ')

    switch (burgerType) {
        case 'chicken':
            restaurant = new ChickenRestaurant();
            break;
        case 'beef':
            restaurant = new BeefRestaurant();
            break;
        case 'bean':
            restaurant = new BeanRestaurant();
            break;
        default:
            throw new Error('Opción no válida! ')
    }

    restaurant.orderHamburguer(); // Ordenamos la hamburguesa 

}

main()

