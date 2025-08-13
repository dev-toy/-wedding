document.addEventListener('DOMContentLoaded', function () {
    const formElement = document.querySelector('.wedding-form');
    const API_URL = "https://00de97822c6ccace.mokky.dev";
    let formFields = {}

    function addFormFields() {
        const formData = new FormData(formElement)
        formFields.name = formData.get('name')
        formFields.visit = formData.get('visit')
        formFields.alcohol = {
            champagne: formData.get('champagne') === null ? 'no' : 'yes',
            vine: formData.get('vine') === null ? 'no' : 'yes',
            vodka: formData.get('vodka') === null ? 'no' : 'yes',
            whiskey: formData.get('whiskey') === null ? 'no' : 'yes',
            cognac: formData.get('cognac') === null ? 'no' : 'yes',
            non_alcoholic: formData.get('non-alcoholic') === null ? 'no' : 'yes',
        }
        formFields.comment = formData.get('comment') === null ? 'no' : formData.get('comment')
    }

    async function addUser() {
        addFormFields()
        const resp = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formFields),
        });

        if (resp.ok) {
            console.log('Успешно отправлено');
        } else {
            console.log('Не удалось отправить');
        }
    }

    formElement.addEventListener('submit', function (e) {
        e.preventDefault()
        addUser()
    })


})