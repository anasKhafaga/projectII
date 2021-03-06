/**
 * Global variables
 */
const generateElement = document.getElementById('generate');
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '40165159a0023c9fd1a73b2d9a713df7';

/**
 * Main Functions
 */

/**
 * @function getData
 * @description fetch data from url
 * @param {string} url - the url of our API
 */
const getData = async (url = '') => {
  const request = await fetch(url);
};

/**
 * @function getDataWeatherApp
 * @description retrieve data from the Weather app
 * @param {string} url
 * @param {string} zip
 * @param {string} apiKey
 */
const getDataWeatherApp = async (url = '', zip, apiKey) => {
  const request = await fetch(`${url}?zip=${zip}&appid=${apiKey}`);
  try {
    const data = await request.json();
    return data;
  } catch (err) {
    return err;
  }
};

/**
 * @function postData
 * @description this function post the data to our api
 * @param {string} url
 * @param {object} userData
 */
const postData = async (url = '', userData) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

/**
 * @function updateUI
 * @description this function updates the ui with the retrieved data from our api
 * @param {object} data
 */
const updateUI = async (data) => {
  const form = document.getElementById('form');
  const divExist = document.getElementById('entryHolder');
  if (divExist) { 
    divExist.remove();
  };
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'entryHolder');
  const d = document.createElement('div')
  d.setAttribute('id', 'date');
  const t = document.createElement('div')
  t.setAttribute('id', 'temp');
  const c = document.createElement('div')
  c.setAttribute('id', 'content');
  d.innerHTML = `Date: ${data['date']}`;
  t.innerHTML = `Temperature: ${data.main.temp}`;
  c.innerHTML = `Feelings: ${data['feelings']}`;
  newDiv.appendChild(d);
  newDiv.appendChild(t);
  newDiv.appendChild(c);
  form.appendChild(newDiv);
};

/**
 * @function takeAction
 * @description the listener for click event on generate button
 */
const takeAction = () => {
  const zip = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;
  getDataWeatherApp(baseURL, zip, apiKey)
    .then((data) => {
      postData('/', {
        temperature: data.main.temp,
        date: Date.now(),
        feelings,
      });
      data.feelings = feelings;
      data.date = Date.now();
      return data;
    })
    .then((data) => {
      updateUI(data);
    })
    .catch(err => {
    alert('Oops! the zip code you entered doesn\'t exist, please try another one')
  })
};

/**
 * Events
 */
generateElement.addEventListener('click', takeAction);

/**
 * Page Start
 */
getData('/');
