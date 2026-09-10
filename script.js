const translateButton = document.getElementById("translateButton");
const inputText = document.getElementById("inputText");
const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");
const translatedText = document.getElementById("translatedText");
const errorMessage = document.getElementById("errorMessage");

translateButton.addEventListener("click", async () => {
  const text = inputText.value.trim();
  const source = sourceLanguage.value;
  const target = targetLanguage.value;

  errorMessage.textContent = "";

  if (!text) {
    errorMessage.textContent = "Please enter some text.";
    return;
  }

  if (source === target) {
    translatedText.textContent = text;
    return;
  }

  translatedText.textContent = "Translating...";

  try {
    const langPair = `${source === "auto" ? "en" : source}|${target}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseData && data.responseData.translatedText) {
      translatedText.textContent = data.responseData.translatedText;
    } else {
      throw new Error("Could not translate.");
    }
  } catch (error) {
    errorMessage.textContent = "Translation failed. Check your internet connection.";
    translatedText.textContent = "";
  }
});