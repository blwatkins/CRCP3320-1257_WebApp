async function getColorName(hexCode) {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => { resolve(5); }, 5_000);
    });
    await timeout;

    const BASE_URL = 'https://api.color.pizza/v1/';
    const params = new URLSearchParams();
    const hexCodeValue = convertHexToURLValue(hexCode);
    params.append('values',  hexCodeValue);
    const requestURL = `${BASE_URL}?${params.toString()}`;
    let colorName = undefined;

    try {
        const response = await fetch(requestURL);

        if (response && response.ok && response.body) {
            const data = await response.json();
            const colors = data.colors;

            if (colors && colors.length > 0) {
                colorName = colors[0].name;
            }
        }
    } catch (error) {
        console.error(error);
    }

    return colorName;
}

function convertHexToURLValue(hexCode) {
    return hexCode.replace('#', '').toLowerCase();
}

const COLOR_NAME_DIV_ID = 'color-name-div';

async function displayColorName(hexCode) {
    const colorNameDiv = document.getElementById(COLOR_NAME_DIV_ID);

    if (colorNameDiv) {
        colorNameDiv.hidden = false;
        colorNameDiv.textContent = 'Loading...';
        const colorName = await getColorName(hexCode);

        if (colorName && typeof colorName === 'string') {
            colorNameDiv.textContent = colorName;
        } else {
            colorNameDiv.textContent = 'Color name not found';
        }
    }
}
