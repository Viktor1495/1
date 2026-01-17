// ================= TELEGRAM =================
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

// ================= ПЕРВАЯ ЧАСТЬ — ТВОИ ВОПРОСЫ =================
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

// ================= МОИ ОТВЕТЫ =================
const myAnswers = [
    "Раздрожения к тебе, ниразу не испытывал, чтобы ты не делала. Мне наборот нравится когда кривляешься, изображаешь кого-то, меняешь голос на мультяшный.",
    "Определенно нет. Но знай точно, что если вдруг, ты будешь в чем-то не права(никогда), я тебе об этом скажу. Никогда не скажу об этом в присутствии посторонних, только на едине.",
    "Твоя поддержка, лучшее лекарство для меня от всех проблем, с которыми я сейчас сталкиваюсь. Твои кружочки утром, заменяют люой текст. А текст, даже если он короткий, он все равно передает всю твою энергию и тепло, заложденное в него.",
    "Я вот сижу и думаю, уже минут 5 и понимаю, что ты максимально открыта со мной и мне даже стыдно, за то, что в чем-то я не так открыт. Поэтому, на данный момент, я будто знаю тебя всю уже. Что и так же, делаю для тебя, раскрываюсь на максимум и не хочу утаивать от тебя ничего.",
    "Я хочу слышать от тебя все. И сам это буду делать. Это важно для нас двоих."
];

// ================= ЭЛЕМЕНТЫ =================
const questionText = document.getElementById("question-text");
const answer = document.getElementById("answer");

const herQuestionText = document.getElementById("her-question-text");
const herAnswer = document.getElementById("her-answer");
const answersList = document.getElementById("answers-list");

// ================= ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ЭКРАНОВ =================
function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach(s => s.classList.remove("active"));
    const screen = document.getElementById(screenId);
    screen.classList.add("active");
}

// ================= МЕНЮ КНОПКИ =================
function goToWelcome() {
    showScreen("welcome");
}

function goToHerQuestions() {
    showScreen("her-questions");
    loadHerQuestion();
}

function goToMyAnswers() {
    showMyAnswers();
}

// ================= СТАРТ =================
function start() {
    showScreen("question-screen");
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
        showScreen("final");
    }
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
    answersList.innerHTML = "";

    myAnswers.forEach((text, i) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<p><strong>Ответ ${i + 1}:</strong><br>${text}</p>`;
        answersList.appendChild(card);
    });

}