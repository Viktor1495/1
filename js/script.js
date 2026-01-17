
const BOT_TOKEN = "8434814252:AAFIT4vld14xSxG2BqNPH_OAhzmCmDteiKk";
const CHAT_ID = "1109918064";

function sendToTelegram(message) {
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    }).catch(() => {});
}

// ================= ПЕРВАЯ ЧАСТЬ (ТВОИ ВОПРОСЫ) =================
const questions = [
    "Что из того, что я делаю, тебя тихо бесит?",
    "Какая часть меня, для тебя до сих пор темный лес?",
    "Тебе когда-нибудь не хватало моей поддержки, когда я не замечал этого?",
    "Что в тебе никто не понимает правильно?",
    "В какой момент ты чувствуешь себя слабой?"
];

let current = 0;

// ================= ЕЁ ВОПРОСЫ =================
const herQuestions = [
    "Первый вопрос!",
    "Второй вопрос!",
    "Третий вопрос!",
    "Четвертый вопрос!",
    "Твой последний вопрос ко мне!"
];

let herCurrent = 0;

// ================= МОИ ОТВЕТЫ (ЗАПОЛНЯЕШЬ ТЫ) =================
const myAnswers = [
    // "Мой ответ на первый вопрос",
    // "Мой ответ на второй вопрос",
    // "Мой ответ на третий вопрос",
    // "Мой ответ на четвертый вопрос",
    // "Мой ответ на пятый вопрос"
];

// ================= ЭЛЕМЕНТЫ =================
const welcome = document.getElementById("welcome");
const questionScreen = document.getElementById("question-screen");
const finalScreen = document.getElementById("final");
const herQuestionsScreen = document.getElementById("her-questions");
const myAnswersScreen = document.getElementById("my-answers");

const questionText = document.getElementById("question-text");
const answer = document.getElementById("answer");

const herQuestionText = document.getElementById("her-question-text");
const herAnswer = document.getElementById("her-answer");
const answersList = document.getElementById("answers-list");

// ================= НАВИГАЦИЯ =================
function switchScreen(from, to) {
    from.classList.remove("active");
    to.classList.add("active");
}

// ================= СТАРТ =================
function start() {
    switchScreen(welcome, questionScreen);
    loadQuestion();
}

// ================= МОИ ВОПРОСЫ =================
function loadQuestion() {
    questionText.textContent = questions[current];
    answer.value = "";
    answer.focus();
}

function nextQuestion() {
    if (!answer.value.trim()) return;

    sendToTelegram(
        `💌 ЕЁ ОТВЕТ ${current + 1}\n\n❓ ${questions[current]}\n✍️ ${answer.value.trim()}`
    );

    current++;

    if (current < questions.length) {
        loadQuestion();
    } else {
        switchScreen(questionScreen, finalScreen);
    }
}

// ================= ПЕРЕХОД К ЕЁ ВОПРОСАМ =================
function goToHerQuestions() {
    switchScreen(finalScreen, herQuestionsScreen);
    loadHerQuestion();
}

// ================= ЕЁ ВОПРОСЫ =================
function loadHerQuestion() {
    herQuestionText.textContent = herQuestions[herCurrent];
    herAnswer.value = "";
    herAnswer.focus();
}

function nextHerQuestion() {
    if (!herAnswer.value.trim()) return;

    sendToTelegram(
        `❓ ВОПРОС ОТ НЕЁ ${herCurrent + 1}\n\n${herAnswer.value.trim()}`
    );

    herCurrent++;

    if (herCurrent < herQuestions.length) {
        loadHerQuestion();
    } else {
        sendToTelegram("📩 Все её вопросы отправлены");
        showMyAnswers();
    }
}

// ================= МОИ ОТВЕТЫ =================
function showMyAnswers() {
    switchScreen(herQuestionsScreen, myAnswersScreen);
    answersList.innerHTML = "";

    myAnswers.forEach((text, i) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<p><strong>Ответ ${i + 1}:</strong><br>${text}</p>`;
        answersList.appendChild(card);
    });
}