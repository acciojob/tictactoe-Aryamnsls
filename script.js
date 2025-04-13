// Simulated async function (could be replaced with a real API call)
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 1000);
  });
}

// Safe check before calling the function
document.getElementById("fetchBtn").addEventListener("click", async () => {
  const resultElement = document.getElementById("result");

  if (typeof fetchData === "function") {
    try {
      const result = await fetchData();
      resultElement.textContent = result;
    } catch (error) {
      resultElement.textContent = "Error fetching data.";
    }
  } else {
    resultElement.textContent = "fetchData function not found.";
  }
});
