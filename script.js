const app = document.querySelector('.app');
const sections = document.querySelectorAll('section');
const steps = document.querySelectorAll('.step');

const backButton = document.querySelector('#back');
const nextButton = document.querySelector('#submit');

const yearly = document.querySelector('#yearly');
const monthly = document.querySelector('#monthly');

const arcadeInput = document.querySelector('#arcade');
const advancedInput = document.querySelector('#advanced');
const proInput = document.querySelector('#pro');

let currentIndex = 0;

function recorrerPorPasos() {
    if (currentIndex < sections.length - 1) {
        sections[currentIndex].classList.add('inactive');
        sections[currentIndex].classList.remove('active');

        if (currentIndex < steps.length - 1) {
            steps[currentIndex].classList.remove('activeStep');
        }

        currentIndex++;

        sections[currentIndex].classList.add('active');
        sections[currentIndex].classList.remove('inactive');

        if (currentIndex < steps.length) {
            steps[currentIndex].classList.add('activeStep');
        }

        if(currentIndex === 4)nextButton.parentElement.style = "display: none;";

        showButtons();
    }
}

function retrocederPorPasos() {
    if (currentIndex > 0) {
        sections[currentIndex].classList.add('inactive');
        sections[currentIndex].classList.remove('active');

        if (currentIndex < steps.length) {
            steps[currentIndex].classList.remove('activeStep');
        }

        currentIndex--;

        sections[currentIndex].classList.add('active');
        sections[currentIndex].classList.remove('inactive');

        steps[currentIndex].classList.add('activeStep');

        showButtons();
    }
}

function changePlan(){
    let ischangedPlan = true;

    if(currentIndex === 3){
        sections[currentIndex].classList.remove('active');
        sections[currentIndex].classList.add('inactive');

        steps[currentIndex].classList.remove('activeStep');

        sections[1].classList.add('active');
        sections[1].classList.remove('inactive');
        steps[1].classList.add('activeStep');

        nextButton.value = "Next Step";
        nextButton.style.backgroundColor = "hsl(213, 96%, 18%)";

        currentIndex = 1;
        ischangedPlan = false
    }

    if(ischangedPlan){
        sections[currentIndex].classList.add('inactive');
        sections[currentIndex].classList.remove('active');

        if (currentIndex < steps.length - 1) {
            steps[currentIndex].classList.remove('activeStep');
        }

        currentIndex++;

        sections[currentIndex].classList.add('active');
        sections[currentIndex].classList.remove('inactive');

        if (currentIndex < steps.length) {
            steps[currentIndex].classList.add('activeStep');
        }
    }
}

function showButtons() {
    if (currentIndex > 0) {
        backButton.style.opacity = "1";
        backButton.style.cursor = "pointer";
    } else {
        backButton.style.opacity = "0";
        backButton.style.cursor = "default";
    }

    if (currentIndex === 3) {
        nextButton.value = "Confirm";
        nextButton.style.backgroundColor = "hsl(243, 100%, 62%)";
    } else {
        nextButton.value = "Next Step";
        nextButton.style.backgroundColor = "hsl(213, 96%, 18%)";
    }
}

function validateForms() {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const numberInput = document.querySelector('#number');

    const name = nameInput.value;
    const email = emailInput.value;
    const number = parseInt(numberInput.value);

    const errorMessage = document.querySelectorAll('.error');

    let isValid = true;

    //Validar Info
    if (name === "") {
        nameInput.style.border = "1px solid hsl(354, 84%, 57%)";
        errorMessage[0].textContent = "This field is required";
        isValid = false;
    } else {
        nameInput.style.border = "1px solid hsl(229, 24%, 87%)";
        errorMessage[0].textContent = "";
    }

    if (email === "" || !email.includes('@')) {
        emailInput.style.border = "1px solid hsl(354, 84%, 57%)";
        errorMessage[1].textContent = email === "" ? "This field is required" : "Invalid email";
        isValid = false;
    } else {
        emailInput.style.border = "1px solid hsl(229, 24%, 87%)";
        errorMessage[1].textContent = "";
    }

    if (isNaN(number) || number.toString().length < 9) {
        numberInput.style.border = "1px solid hsl(354, 84%, 57%)";
        errorMessage[2].textContent = isNaN(number) ? "This field is required" : "Min 9 digits";
        isValid = false;
    } else {
        numberInput.style.border = "1px solid hsl(229, 24%, 87%)";
        errorMessage[2].textContent = "";
    }

    //Validar Plan
    if(sections[1].classList.contains('active')){
        if (!arcadeInput.checked && !advancedInput.checked && !proInput.checked) {
            arcadeInput.nextElementSibling.style.border = "1px solid hsl(354, 84%, 57%)";
            advancedInput.nextElementSibling.style.border = "1px solid hsl(354, 84%, 57%)";
            proInput.nextElementSibling.style.border = "1px solid hsl(354, 84%, 57%)";
            isValid = false;
        } else {
            arcadeInput.nextElementSibling.style.border = "1px solid hsl(229, 24%, 87%)";
            advancedInput.nextElementSibling.style.border = "1px solid hsl(229, 24%, 87%)";
            proInput.nextElementSibling.style.border = "1px solid hsl(229, 24%, 87%)";
        }
    }

    if (isValid) {
        recorrerPorPasos();
        resetStylesAndErrors(errorMessage);
    }
}

function resetStylesAndErrors(errorMessage) {
    const inputs = document.querySelectorAll('#name, #email, #number');

    inputs.forEach(input => {
        input.style.border = "1px solid hsl(229, 24%, 87%)";
    });

    errorMessage.forEach(error => {
        error.textContent = "";
    });
}

function selectPLan() {
    const addOnsSummary = document.querySelectorAll('.sumAddOns');
    const inputPlans = document.querySelectorAll('.radio-plan');

    const toggle = document.querySelector('#bolaToggle');
    const toggleLabels = document.querySelectorAll('.plan_toggle');

    const yearlyPlan = document.querySelectorAll('.container_planAdd');

    toggleChecked(inputPlans);
    monthlyOrYearly(yearly, monthly, toggle, toggleLabels, yearlyPlan, addOnsSummary);
}

function toggleChecked(inputPlans) {
    inputPlans[currentIndex].checked = true;
    currentIndex++;
    if (currentIndex >= inputPlans.length) currentIndex = 0;
    inputPlans[currentIndex].checked = false;
}

function monthlyOrYearly(yearly, monthly, toggle, toggleLabels, yearlyPlan, addOnsSummary) {
    if (yearly.checked) {
        toggle.style.left = "19px";
        toggleLabels[1].classList.add('active');
        toggleLabels[0].classList.remove('active');
        yearlyPlan[0].innerHTML = `
            <p class="paragraph">Arcade</p>
            <p class="plan_price">$90/yr</p>
            <p class="free">2 months free</p>
        `;
        yearlyPlan[1].innerHTML = `
            <p class="paragraph">Advanced</p>
            <p class="plan_price">$120/yr</p>
            <p class="free">2 months free</p>
        `;
        yearlyPlan[2].innerHTML = `
            <p class="paragraph">Pro</p>
            <p class="plan_price">$150/yr</p>
            <p class="free">2 months free</p>
        `;
        addOnsSummary[0].textContent = "+$10/yr";
        addOnsSummary[1].textContent = "+$20/yr";
        addOnsSummary[2].textContent = "+$20/yr";
    } else{
        addOnsSummary[0].textContent = "+$1/mo";
        addOnsSummary[1].textContent = "+$2/mo";
        addOnsSummary[2].textContent = "+$2/mo";
    }

    if (monthly.checked) {
        toggle.style.left = "0";
        toggleLabels[1].classList.remove('active');
        toggleLabels[0].classList.add('active');
        yearlyPlan[0].innerHTML = `
            <p class="paragraph">Arcade</p>
            <p class="plan_price">$9/mo</p>
        `;
        yearlyPlan[1].innerHTML = `
            <p class="paragraph">Advanced</p>
            <p class="plan_price">$12/mo</p>
        `;
        yearlyPlan[2].innerHTML = `
            <p class="paragraph">Pro</p>
            <p class="plan_price">$15/mo</p>
        `;
    }
}

function dynamicTotal(){
    const chosenPlan = document.querySelector("#chosenPlan");
    const planAddOns = document.querySelectorAll(".planAddOns");
    const planCost = document.querySelector("#planCost");

    const service = document.querySelector('#service').checked;
    const storage = document.querySelector('#storage').checked;
    const customizable = document.querySelector('#customizable').checked;

    const total = document.querySelector("#total");
    const sumaTotal = document.querySelector("#sumaTotal");

    let planDynamically = "";

    let sumar = 0;

    total.textContent = `${yearly.checked ? planDynamically = "Total (per year)": planDynamically = "Total (per month)"}`;

    if(arcadeInput.checked){
        chosenPlan.textContent = `Arcade(${yearly.checked ? planDynamically = "Yearly": planDynamically = "Monthly"})`;
        planCost.textContent = `${yearly.checked ? planDynamically = "$90/yr": planDynamically = "$9/mo"}`;
        yearly.checked ? sumar = 90 : sumar = 9;
    }

    if(advancedInput.checked){
        chosenPlan.textContent = `Advanced(${yearly.checked ? planDynamically = "Yearly": planDynamically = "Monthly"})`;
        planCost.textContent = `${yearly.checked ? planDynamically = "$120/yr": planDynamically = "$12/mo"}`;
        yearly.checked ? sumar = 120 : sumar = 12;
    }

    if(proInput.checked){
        chosenPlan.textContent = `Pro(${yearly.checked ? planDynamically = "Yearly": planDynamically = "Monthly"})`;
        planCost.textContent = `${yearly.checked ? planDynamically = "$150/yr": planDynamically = "$15/mo"}`;
        yearly.checked ? sumar = 150 : sumar = 15;
    }


    if(service){
        planAddOns[0].textContent = `${yearly.checked ? planDynamically = "+$10/yr": planDynamically = "+$1/mo"}`
        planAddOns[0].parentElement.style = "display: flex;"
        yearly.checked ? sumar+= 10 : sumar+= 1;
    } else{
        planAddOns[0].parentElement.style = "display: none;"
    }

    if(storage){
        planAddOns[1].textContent = `${yearly.checked ? planDynamically = "+$20/yr": planDynamically = "+$2/mo"}`
        planAddOns[1].parentElement.style = "display: flex;"
        yearly.checked ? sumar+= 20 : sumar+= 2;
    } else{
        planAddOns[1].parentElement.style = "display: none;"
    }

    if(customizable){
        planAddOns[2].textContent = `${yearly.checked ? planDynamically = "+$20/yr": planDynamically = "+$2/mo"}`
        planAddOns[2].parentElement.style = "display: flex;"
        yearly.checked ? sumar+= 20 : sumar+= 2;
    } else{
        planAddOns[2].parentElement.style = "display: none;";
    }

    sumaTotal.textContent = `$${sumar}${yearly.checked ? planDynamically = "/yr": planDynamically = "/mo"}`;
}


app.addEventListener('click', (e) => {
    if (e.target.id === 'submit') {
        validateForms();
        dynamicTotal();
    }

    if (e.target.id === 'back') {
        retrocederPorPasos();
    }

    if (e.target.className === 'toggleChoice' ||
        e.target.id === 'bolaToggle' ||
        e.target.className === 'plan_toggle') {
        selectPLan();
    }

    if(e.target.nodeName === 'A'){
        changePlan();
    }
});