const inputField = document.getElementById("inputField");
const genBtn = document.getElementById("genBtn");
const inputImg = document.querySelector("#qrimg");
const outputQR = document.querySelector(".outputQR");
const downloadBtn = document.getElementById("downloadBtn");

genBtn.addEventListener("click", () => {
  const inputval = inputField.value;
  getQrCode(inputval);

  if (inputval == "") {
    alert("Please Enter the Text or URL...");
  }
});

const getQrCode = async (e) => {
  const data = await fetch(
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + e
  );

  if (data.ok) {
    const blob = await data.blob();
    inputImg.src = URL.createObjectURL(blob);
    downloadBtn.href = inputImg.src;
    downloadBtn.download = `${e}.png`;
  } else {
    alert("Failed to generate QR code. Please try again.");
  }
};

downloadBtn.addEventListener("click", () => {
  if (!inputImg.src) {
    alert("Please generate a QR code first.");
  }
});
