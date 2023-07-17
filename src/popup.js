document.getElementById("change-dom").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: changeDom,
  });
});

function changeDom() {
  const listContainer = document.querySelector('div[role="log"]');
  let listItems = Array.from(listContainer.children);
  listItems = listItems.filter(
    (item) => item.getAttribute("data-test-id") !== "convo_log_sentinel_2"
  );
  console.log("listItems:", listItems); // Add this line for debugging
  console.log("listContainer:", listContainer); // Add this line for debugging

  // Convert NodeList to array for easier manipulation
  //const itemsArray = Array.from(listItems);

  // Reverse the order of the items
  listItems.reverse();

  // Clear the existing list
  listContainer.innerHTML = "";

  // Add the reversed items back to the list container
  listItems.forEach((item) => {
    listContainer.appendChild(item);
  });
  let div = document.querySelector('div[role="log"]');
  div.scrollTop = 0;
}
