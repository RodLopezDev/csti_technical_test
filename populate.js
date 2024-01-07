const { default: axios } = require('axios');

const currencies = ['EUR', 'GBP', 'CHF', 'PEN'];

function invert({ source, target, rate }) {
  return { source: target, target: source, rate: 1 / rate };
}

async function main() {
  const apiKey = process.argv?.[2] || '';
  if (!apiKey) {
    throw new Error('API_KEY_NOT_FOUND');
  }

  const { data, status } = await axios(
    `https://api.fastforex.io/fetch-multi?from=USD&to=${currencies.join(
      ',',
    )}&api_key=${apiKey}`,
  );
  if (status !== 200) {
    return;
  }
  // const data = {
  //   base: 'USD',
  //   results: { EUR: 0.91402, GBP: 0.78631, CHF: 0.85043, PEN: 3.71777 },
  //   updated: '2024-01-07 03:38:04',
  //   ms: 4,
  // };

  const results = Object.keys(data.results).map((result) => ({
    source: 'USD',
    target: result,
    rate: data.results[result],
  }));
  const elements = results.reduce((prev, curr) => {
    prev.push(curr);
    prev.push(invert(curr));
    return prev;
  }, []);

  const { data: token, status: authStatus } = await axios.post(
    'http://localhost:4000/auth/login',
    {
      user: 'RODRIGO',
      password: 'test-to-csti',
    },
  );
  if (authStatus !== 201) {
    return;
  }

  await Promise.all(
    elements.map(async (element) => {
      const rate = Number(Number(element.rate).toFixed(2));
      const payload = {
        rate,
        sourceCurrency: element.source,
        targetCurrency: element.target,
      };
      try {
        const { data } = await axios.post(
          'http://localhost:4000/exchange-rate',
          payload,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log(payload, 'Inserted');
        return data;
      } catch (e) {
        console.log(e?.response?.data);
        return null;
      }
    }),
  );
}

main();
