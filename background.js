chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: reorderComments,
      }, () => { console.log('Injected function on tab load'); });
    }
  });
  
  function reorderComments() {
    var checkExist = setInterval(function() {
      var element = document.querySelector('div[role="log"]');
      if (element) {
        console.log("logs div is loaded");
        clearInterval(checkExist);
        // const listContainer = document.querySelector('div[role="log"]');
        // let listItems = Array.from(listContainer.children);
        const listContainers = Array.from(document.querySelectorAll('div[role="log"]'));
        listContainers.forEach(listContainer => {
            let listItems = Array.from(listContainer.children);
            listItems = listItems.filter(item => item.getAttribute('data-test-id') !== 'convo_log_sentinel_2');
            listItems = listItems.filter(item => item.getAttribute('data-test-id') !== 'convo_log_sentinel_1');
            console.log('listItems:', listItems); // Add this line for debugging
            console.log('listContainer:', listContainer); // Add this line for debugging
        
            // Convert NodeList to array for easier manipulation
            //const itemsArray = Array.from(listItems);
        
            // Reverse the order of the items
            listItems.reverse();
        
            // Clear the existing list
            listContainer.innerHTML = '';
        
            // Add the reversed items back to the list container
            listItems.forEach((item) => {
            listContainer.appendChild(item);
            });
            let div = document.querySelector('div[role="log"]');
            div.scrollTop = 0;
        });
      }
    }, 100); // check every 100ms
  }
  