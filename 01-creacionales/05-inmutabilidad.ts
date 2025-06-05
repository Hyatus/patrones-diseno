import { COLORS } from "../helpers/colors.ts";

/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
class CodeEditorState{
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsaveChanges: boolean;

    constructor(content: string, cursorPosition: number, unsaveChanges: boolean){
        this.content = content
        this.cursorPosition = cursorPosition
        this.unsaveChanges = unsaveChanges
    }

    displayState(){
        console.log('\n%cEstado del editor',COLORS.green)
        console.log(`
            Contenido ${this.content}
            Cursor Pos: ${this.cursorPosition }
            Unsave Changes: ${this.unsaveChanges }
        `)
    }

    // Partial hace que todas las propiedades sean opcionales
    copyWith({
        content, 
        cursorPosition,
        unsaveChanges
    }:Partial<CodeEditorState>): CodeEditorState{
       return new CodeEditorState(
        content ?? this.content, // Si contenido tiene algún valor lo devuelve 
        cursorPosition ?? this.cursorPosition, 
        unsaveChanges ?? this.unsaveChanges
       )     
    }
}

class CodeEditorHistory{
    private history: CodeEditorState[] = [];
    private currentIndex: number = -1;  // 0 1 2 3 4 5 6 

    save(state: CodeEditorState): void {
        if ( this.currentIndex < this.history.length - 1) this.history = this.history.splice(0, this.currentIndex + 1)
        this.history.push(state)
        this.currentIndex++;
    }

    redo(): CodeEditorState | null {
        if(this.currentIndex < this.history.length - 1){
            this.currentIndex++;
            return this.history[this.currentIndex]
        }
        return null;
    }

    undo(): CodeEditorState | null {
        if(this.currentIndex > 0){
            this.currentIndex --;
            return this.history[this.currentIndex]
        }

        return null;
    }

}

function main(){
    const history = new CodeEditorHistory() // Historia de nuestro editor de código
    let editorState = new CodeEditorState("console.log('Hola Mundo')",2,false);

    history.save(editorState)

    console.log('%cEstado Inicial',COLORS.yellow)
    editorState.displayState()
    
    editorState = editorState.copyWith({
        content: "console.log('Hola Mundo); \n console.log('Nueva Línea')",
        cursorPosition: 3,
        unsaveChanges: true 
    })
    
    history.save(editorState)
    
    console.log('%cDespués del primer cambio ',COLORS.green)
    editorState.displayState()
    
    console.log('%cDespués del segundo cambio ',COLORS.green)
    editorState = editorState.copyWith({
        cursorPosition: 5
    })
    history.save(editorState);
    editorState.displayState()
    
    console.log('%cDespués del Undo ',COLORS.green)
    editorState = history.undo()!; // Signo ! indica que aunque pueda devolver null siempre vamos a tenerlo
    editorState.displayState()

    console.log('%cDespués del Undo ',COLORS.green)
    editorState = history.redo()!; // Signo ! indica que aunque pueda devolver null siempre vamos a tenerlo
    editorState.displayState()

}

main()

