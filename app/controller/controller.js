import axios from "axios";

export function getCurrentDateTimeFormatted() {
  const currentDate = new Date();

  // Create an array of month names
//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];

  // Get the various date and time components
  const year = currentDate.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (adding 1 because it's zero-based)
  const day = currentDate.getDate().toString().padStart(2, '0'); // Ensure a 2-digit day
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentDate.getDay()]; // Get the day of the week abbreviation
  const hours = currentDate.getHours().toString().padStart(2, '0'); // Ensure a 2-digit hour
  const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Ensure a 2-digit minute
  const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // Ensure a 2-digit second

  // Create the formatted date string
  const formattedDate = `${month}/${day}/${year}(${dayOfWeek})${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export function convertBytesToKBorMB(bytes) {
  if (bytes < 1024 * 1024) {
    // If bytes are less than 1MB, convert to KB
    return (bytes / 1024).toFixed(2) + " KB";
  } else {
    // If bytes are 1MB or higher, convert to MB
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }
}

export function sortThreadsByCreatedAt(threads) {
  // Custom comparison function to sort threads by created_at
  function compareCreatedAt(thread1, thread2) {
    let createdAt1;
    let createdAt2;
    if (thread1.replies.length > 0) {
      createdAt1 = parseCreatedAt(thread1.replies[thread1.replies.length -1].created_at)
    } else {
      createdAt1 = parseCreatedAt(thread1.created_at);
    }

    if (thread2.replies.length > 0) {
      createdAt2 = parseCreatedAt(thread2.replies[thread2.replies.length -1].created_at)
    } else {
      createdAt2 = parseCreatedAt(thread2.created_at);
    }

    if (createdAt1 < createdAt2) {
      return 1;
    } else if (createdAt1 > createdAt2) {
      return -1;
    } else {
      return 0;
    }
  }

  // Helper function to parse created_at into a comparable format
  function parseCreatedAt(createdAtStr) {
    const parts = createdAtStr.match(/(\d{2})\/(\d{2})\/(\d{2})\((\w{3})\)(\d{2}:\d{2}:\d{2})/);

    if (!parts) {
      throw new Error('Invalid created_at format');
    }

    const year = `20${parts[3]}`;
    const month = parts[1] - 1; // JavaScript months are 0-based
    const day = parts[2];
    const time = parts[5].split(':');
    const hours = time[0];
    const minutes = time[1];
    const seconds = time[2];

    return new Date(year, month, day, hours, minutes, seconds);
  }

  // Sort the threads using the custom comparison function
  const sortedThreads = threads.slice().sort(compareCreatedAt);

  return sortedThreads;
}

export function deleteThread(postNum) {
  const url = `https://cartoon-imageboard-server.vercel.app/threads/${postNum}`

  axios.delete(url)
}

export function addToArray(arr, str) {
  if (!arr.includes(str)) {
    arr.push(str)
  }
  
  return arr
}

export function getTranslatedText(language, text, model, setComment) {
  //const url = `https://cartoon-imageboard-server.vercel.app/translate`
  const url = 'https://cartoonhub-server.cyclic.cloud/translate'
  const requestData = {language: language, text: text, model: model}

  axios.post(url, requestData)
  .then((response) => {
    setComment(response.data.message)
    return response.data.message
  })
  .catch(() => {
    return false
  })
}

export function saveLanguageSetting(language) {
  localStorage.setItem('ch: language', language)
}

export function getLanguageSetting() {
  const language = localStorage.getItem('ch: language') || 'None'
  return language
}

export function saveGptSetting(model) {
  localStorage.setItem('ch: gpt-model', model)
}

export function getGptSetting() {
  const model = localStorage.getItem('ch: gpt-model') || 'gpt-3.5-turbo'
  return model
}