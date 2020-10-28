import Swal from "sweetalert2";

class GenericFunctions {
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getGrammaticalGender(string) {
        const masculineWords = ["jugador"]
        const feminineWords = ["carrera"]
        if (masculineWords.includes(string)) {
            return {created: "creado", the: "el"}
        } else if (feminineWords.includes(string)) {
            return {created: "creada", the: "la"}
        } else {
            return {created: "creado/a", the: "el/la"}
        }
    }

    successMessage(element) {
        const grammaticalGenderWord = this.getGrammaticalGender(element)
        const capitalizedElement = this.capitalize(element)
        const message_title = "¡" + capitalizedElement + " " + grammaticalGenderWord.created + " con éxito!"
        Swal.fire({
            title: message_title,
            icon: 'success',
        })
    }

    errorMessage(element) {
        const grammaticalGenderWord = this.getGrammaticalGender(element)
        const message_text = "Ha ocurrido un error al momento de crear " + grammaticalGenderWord.the +
            " " + element + ". Por favor, revise los datos ingresados y vuelva a intentarlo.";
        Swal.fire({
            title: '¡Error!',
            text: message_text,
            icon: 'error',
        })
    }
}

export default GenericFunctions