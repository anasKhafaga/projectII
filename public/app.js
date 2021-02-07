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
  const request = await fetch(`${url}?zip=${zip},eg&appid=${apiKey}`);
  try {
    const data = await request.json();
    return data;
  } catch (err) {
    console.log('Error', err);
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
    console.log('Error', err);
  }
};

/**
 * @function updateUI
 * @description this function updates the ui with the retrieved data from our api
 * @param {object} data
 */
const updateUI = async (data) => {
  document.getElementById('date').innerHTML = `Date: ${data['date']}`;
  document.getElementById('temp').innerHTML = `Temperature: ${data.main.temp}`;
  document.getElementById(
    'content'
  ).innerHTML = `Feelings: ${data['feelings']}`;
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
    });
};

/**
 * Events
 */
generateElement.addEventListener('click', takeAction);

/**
 * Page Start
 */
getData('/');
