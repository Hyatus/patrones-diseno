import { COLORS } from "../helpers/colors.ts";

/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */
class DragonBalls {
    // Singleton 
    private static instance: DragonBalls;
    private ballsCollected: number; // Cuántas esferas coleccionadas 

    // Queremos evitar la creación de nuevas instancias
    private constructor(){
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {
        if(!DragonBalls.instance){
            DragonBalls.instance = new DragonBalls()
            console.log("%cEsferas Creadas",COLORS.green)
        }
        return DragonBalls.instance;
    }

    collectBall():void{
        if(this.ballsCollected<=7){
            this.ballsCollected++;
            console.log(`%cEsfera recolectada, Total de esferas ${this.ballsCollected}`,COLORS.orange)
            return 
        }
        console.log("%cLas 7 esferas fueron recolectadas",COLORS.yellow)
    }


    summonShengLong(){
        if(this.ballsCollected == 7){
            console.log("%cShengLong ha sido invocado",COLORS.yellow)
            this.ballsCollected = 0
            return
        }

        console.log(`%cAún faltan ${7-this.ballsCollected} esferas`,COLORS.red)
    }

}

function main(){
    const goku = DragonBalls.getInstance()
    goku.collectBall()
    goku.collectBall()
    goku.collectBall()
    goku.collectBall()

    goku.summonShengLong()
}

main()


