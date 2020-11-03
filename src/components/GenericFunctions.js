import Swal from "sweetalert2";

class GenericFunctions {

    // Capitalises any given string
    capitalise(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Returns the gramatical gender of previously saved words based on a dictionary of masculine and feminine words
    getGrammaticalGender(string) {
        const masculineWords = ["jugador", "jugadores"]
        const feminineWords = ["formación"]
        if (masculineWords.includes(string)) {
            return {created: "creado", the: "el", pluralThe: "los"}
        } else if (feminineWords.includes(string)) {
            return {created: "creada", the: "la", pluralThe: "las"}
        } else {
            return {created: "creado/a", the: "el/la", pluralThe: "los/las"}
        }
    }

    // Returns a success message when an element (passed as a parameter) is created
    creationSuccessMessage(element) {
        const grammaticalGenderWord = this.getGrammaticalGender(element)
        const capitalisedElement = this.capitalise(element)
        const message_title = "¡" + capitalisedElement + " " + grammaticalGenderWord.created + " con éxito!"
        Swal.fire({
            title: message_title,
            icon: 'success',
        })
    }

    // Returns an error message when an element (passed as a parameter) intents to be created
    creationErrorMessage(element) {
        const grammaticalGenderWord = this.getGrammaticalGender(element)
        const message_text = "Ha ocurrido un error al momento de crear " + grammaticalGenderWord.the +
            " " + element + ". Por favor, revise los datos ingresados y vuelva a intentarlo.";
        Swal.fire({
            title: '¡Error!',
            text: message_text,
            icon: 'error',
        })
    }

    // Returns an error message when there's a failure in the PDF request
    getPDFErrorMessage() {
        const message_text = "Ha ocurrido un error al momento de obtener el PDF solicitado. " +
            "Por favor, intente nuevamente"
        Swal.fire({
            title: '¡Error!',
            text: message_text,
            icon: 'error',
        })
    }

    // Returns an error message when there's a failure in the data request
    getDataErrorMessage(element) {
        const grammaticalGenderWord = this.getGrammaticalGender(element)
        const message_text = "Ha ocurrido un error al momento de obtener los datos de "
            + grammaticalGenderWord.pluralThe + " " + element + "."
        Swal.fire({
            title: '¡Error!',
            text: message_text,
            icon: 'error',
        })
    }
}

export default GenericFunctions