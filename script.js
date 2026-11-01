const getStartedButton = document.querySelector("button");
const welcomeScreen = document.querySelector(".welcome");
const onboardingScreen = document.querySelector(".onboarding");
const nameInput = document.getElementById("name");
const continueButton = document.getElementById("continueBtn");
const nameError = document.querySelector(".name-error");
const dashboard = document.querySelector(".dashboard");

getStartedButton.addEventListener("click", () => {
  console.log("Welcome to Dearie!");
  welcomeScreen.style.display = "none";
  onboardingScreen.style.display = "flex";
});

continueButton.addEventListener("click", () => {
  if (nameInput.value.trim() === "") {
    nameError.style.display = "block";
    return;
  }
  nameError.style.display = "none";
  localStorage.setItem("nameInput", nameInput.value);
  onboardingScreen.style.display = "none";
  dashboard.style.display = "flex";
});
