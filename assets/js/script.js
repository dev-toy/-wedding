document.addEventListener('DOMContentLoaded', function () {
    const formElement = document.querySelector('.wedding-form');
    const body = document.querySelector('.body');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal__close');
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
    }
    modalClose.addEventListener('click', function (e) {
        e.preventDefault()
        modal.classList.remove('success')
        modal.classList.remove('error')
        body.classList.remove('stop-scroll')
        formElement.reset();
    })
    async function addUser() {
        try {
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
                modal.classList.add('success')
                body.classList.add('stop-scroll')
            } else {
                modal.classList.add('error')
                body.classList.add('stop-scroll')
            }
        } catch (error) {
            modal.classList.add('error')
            body.classList.add('stop-scroll')
        }

    }
    formElement.addEventListener('submit', function (e) {
        e.preventDefault()
        addUser()
    })


})