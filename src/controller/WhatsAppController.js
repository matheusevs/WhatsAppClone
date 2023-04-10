class WhatsAppController {
    
    constructor(){

        this.elementsPrototype();
        this.loadElements();

    }

    loadElements(){

        this.el = {};
        
        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element;

        });

    }

    elementsPrototype(){

        Element.prototype.hide = function (){

            

        }

    }

}