const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const sourceText = document.getElementById("sourceText");
const translatedText = document.getElementById("translatedText");
const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swapBtn");
const copyBtn = document.getElementById("copyBtn");
const speakBtn = document.getElementById("speakBtn");

// List of common language codes and names
const languages = {
  "en": "English",
  "es": "Spanish",
  "fr": "French",
  "de": "German",
  "hi": "Hindi",
  "zh": "Chinese",
  "ar": "Arabic",
  "ru": "Russian",
  "ja": "Japanese",
  "ko": "Korean",
  "it": "Italian",
  "pt": "Portuguese",
  "bn": "Bengali",
  "ta": "Tamil",
  "te": "Telugu"
};

function populateLanguageDropdowns() {
  for (let code in languages) {
    const option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = languages[code];

    const option2 = option1.cloneNode(true);

    sourceLang.appendChild(option1);
    targetLang.appendChild(option2);
  }

  sourceLang.value = "en";
  targetLang.value = "hi";
}

populateLanguageDropdowns();

translateBtn.addEventListener("click", () => {
  const text = sourceText.value.trim();
  const from = sourceLang.value;
  const to = targetLang.value;

  if (!text) {
    alert("Please enter text to translate.");
    return;
  }

  fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`)
    .then(res => res.json())
    .then(data => {
      translatedText.value = data.responseData.translatedText;
    })
    .catch(err => {
      console.error(err);
      alert("Translation failed. Try again later.");
    });
});

swapBtn.addEventListener("click", () => {
  const tempLang = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = tempLang;

  const tempText = sourceText.value;
  sourceText.value = translatedText.value;
  translatedText.value = tempText;
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(translatedText.value)
    .then(() => alert("Translated text copied!"))
    .catch(() => alert("Failed to copy text."));
});

speakBtn.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(translatedText.value);
  utterance.lang = targetLang.value;
  speechSynthesis.speak(utterance);
});
