/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */
class Document {
    public title: string;
    private content: string; // Nivel de acceso protegido
    public autor: string;

    constructor(title:string,content:string,autor:string){
        this.title = title;
        this.content = content;
        this.autor = autor;
    }
    
    diplayInfo(){
        console.log(`
            Title: ${this.title}
            Content: ${this.content}
            Author: ${this.autor}
        `)
    }

    clone():Document{
        return new Document(this.title,this.content,this.autor)
    }
}


function main(){
    const documentOne = new Document('Cotización','500 dólares','Fernando')
    console.log(documentOne)
    documentOne.diplayInfo()

    const documentTwo = documentOne.clone()
    documentTwo.title = 'Nuevo Documento'
    console.log({documentTwo})
    documentOne.diplayInfo()
}

main()