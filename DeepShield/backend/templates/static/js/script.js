const BACKEND_BASE_URL = "http://127.0.0.1:8001";

// Elements
const fileInput = document.getElementById("fileInput");
const uploadArea = document.getElementById("uploadArea");

const selectedFile = document.getElementById("selectedFile");
const fileName = document.getElementById("fileName");
const fileType = document.getElementById("fileType");
const fileIcon = document.getElementById("fileIcon");

const removeFile = document.getElementById("removeFile");
const detectBtn = document.getElementById("detectBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");

const resultIcon = document.getElementById("resultIcon");
const resultText = document.getElementById("resultText");
const confidenceText = document.getElementById("confidenceText");

const mediaTypeText =
    document.getElementById("mediaTypeText");

const resultDescription =
    document.getElementById("resultDescription");

const analysisMessage =
    document.getElementById("analysisMessage");


let selectedMediaFile = null;


// =====================================
// FILE INPUT
// =====================================

fileInput.addEventListener("change", function () {

    console.log("File selected:", fileInput.files);

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    handleFile(file);
});


// =====================================
// HANDLE FILE
// =====================================

function handleFile(file) {

    console.log("Handling file:", file.name);

    const name = file.name.toLowerCase();

    const isImage =
        file.type.startsWith("image/") ||
        name.endsWith(".jpg") ||
        name.endsWith(".jpeg") ||
        name.endsWith(".png");

    const isAudio =
        file.type.startsWith("audio/") ||
        name.endsWith(".wav") ||
        name.endsWith(".mp3");


    if (!isImage && !isAudio) {

        alert("Please select a JPG, PNG, WAV or MP3 file.");

        fileInput.value = "";

        return;
    }


    // Save selected file
    selectedMediaFile = file;


    // Show filename
    fileName.textContent = file.name;


    // Show file type
    if (isImage) {

        fileType.textContent = "Image file";
        fileIcon.textContent = "🖼️";

    } else {

        fileType.textContent = "Audio file";
        fileIcon.textContent = "🎵";
    }


    // SHOW SELECTED FILE BOX
    selectedFile.style.display = "flex";


    // Enable detection
    detectBtn.disabled = false;


    // Hide previous result
    result.style.display = "none";


    console.log("Selected file displayed:", file.name);
}


// =====================================
// REMOVE FILE
// =====================================

removeFile.addEventListener("click", function () {

    selectedMediaFile = null;

    fileInput.value = "";

    selectedFile.style.display = "none";

    detectBtn.disabled = true;

    result.style.display = "none";
});


// =====================================
// DRAG AND DROP
// =====================================

uploadArea.addEventListener("dragover", function (event) {

    event.preventDefault();

    uploadArea.classList.add("drag-active");
});


uploadArea.addEventListener("dragleave", function () {

    uploadArea.classList.remove("drag-active");
});


uploadArea.addEventListener("drop", function (event) {

    event.preventDefault();

    uploadArea.classList.remove("drag-active");

    const file = event.dataTransfer.files[0];

    if (file) {
        handleFile(file);
    }
});


// =====================================
// DETECT
// =====================================

detectBtn.addEventListener("click", async function () {

    if (!selectedMediaFile) {
        alert("Please select a file first.");
        return;
    }


    detectBtn.disabled = true;

    loading.style.display = "flex";

    result.style.display = "none";


    try {

        const formData = new FormData();

        formData.append("file", selectedMediaFile);


        const name =
            selectedMediaFile.name.toLowerCase();


        const isImage =
            selectedMediaFile.type.startsWith("image/") ||
            name.endsWith(".jpg") ||
            name.endsWith(".jpeg") ||
            name.endsWith(".png");


        const isAudio =
            selectedMediaFile.type.startsWith("audio/") ||
            name.endsWith(".wav") ||
            name.endsWith(".mp3");


        let endpoint;


        if (isImage) {

            endpoint =
                `${BACKEND_BASE_URL}/image/detect`;

        }
        else if (isAudio) {

            endpoint =
                `${BACKEND_BASE_URL}/audio/detect`;

        }
        else {

            throw new Error("Unsupported file type.");
        }


        console.log("Sending to:", endpoint);


        const response = await fetch(endpoint, {
            method: "POST",
            body: formData
        });


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText || "Detection failed."
            );
        }


        const data =
            await response.json();


        console.log("Detection result:", data);


        showResult(data);


    } catch (error) {

        console.error("Detection error:", error);

        alert(
            "Unable to process the file.\n\n" +
            error.message
        );

    } finally {

        loading.style.display = "none";

        detectBtn.disabled = false;
    }

});


// =====================================
// SHOW RESULT
// =====================================

function showResult(data) {

    result.style.display = "flex";


    const prediction =
        String(data.prediction || "").toLowerCase();


    console.log("FULL BACKEND RESPONSE:", data);

let confidenceTextValue = data.confidence || "N/A";

confidenceText.textContent = confidenceTextValue;


    const name =
        selectedMediaFile.name.toLowerCase();


    const isImage =
        selectedMediaFile.type.startsWith("image/") ||
        name.endsWith(".jpg") ||
        name.endsWith(".jpeg") ||
        name.endsWith(".png");


    mediaTypeText.textContent =
        isImage ? "Image" : "Audio";


    if (
        prediction.includes("fake") ||
        prediction.includes("deepfake") ||
        prediction.includes("synthetic")
    ) {

        resultIcon.textContent = "!";

        resultIcon.style.background = "#fee2e2";

        resultIcon.style.color = "#dc2626";

        resultText.textContent =
            "Potential Deepfake Detected";

        resultDescription.textContent =
            "The AI model identified patterns associated with synthetic or manipulated media.";

        analysisMessage.textContent =
            "⚠️ The uploaded media may have been artificially generated or manipulated. Consider checking its original source before trusting or sharing it.";

    } else {

        resultIcon.textContent = "✓";

        resultIcon.style.background = "#dcfce7";

        resultIcon.style.color = "#16a34a";

        resultText.textContent =
            "No Deepfake Detected";

        resultDescription.textContent =
            "The AI model did not identify strong patterns associated with synthetic or manipulated media.";

        analysisMessage.textContent =
            "✓ The submitted media appears consistent with authentic content according to the detection model.";
    }
}