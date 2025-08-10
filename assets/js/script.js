document.addEventListener('DOMContentLoaded', function () {
    const formElement = document.querySelector('.wedding-form');
    const formSubmit = document.querySelector('.wedding-form__submit')
    const API_URL = "https://00de97822c6ccace.mokky.dev";
    let formFields = {}

    function addFormFields() {
        const formData = new FormData(formElement)
        formFields.name = formData.get('NAME')
        formFields.surname = formData.get('SURNAME')
        formFields.checkbox = {
            checkbox_1: formData.get('check1'),
            checkbox_2: formData.get('check2'),
            checkbox_3: formData.get('check3'),
            checkbox_4: formData.get('check4'),
            checkbox_5: formData.get('check5'),
        }
        formFields.radio = formData.get('radio')
        formFields.comment = formData.get('COMMENT')
    }

    async function addUser() {
        addFormFields()
        const resp = await fetch(`${API_URL}/users`, {
            method: "POST", // 👈 Отправляем именно POST-запрос
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formFields), // 👈 И передаем сам текст задачи
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