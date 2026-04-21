// server/app.js
const express = require('express');
const axios = require('axios');
// const morgan = require('morgan');
const path = require('path');

const app = express();
const SONAR_LOGIN_URL = 'https://hw-apigw.sonarplatform.com/client-sonar/login';
const SONAR_SUMMARY_URL = 'https://hw-apigw.sonarplatform.com/client-sonar/summary';

app.use(express.json());

// Setup logger
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.post('/api/sonar/summary', async (req, res) => {
  const {
    appCode,
    startDate,
    endDate,
    campaigns = [],
  } = req.body || {};

  if (!appCode || !startDate || !endDate || !campaigns.length) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'appCode, startDate, endDate, dan campaigns wajib diisi.',
    });
  }

  try {
    const loginResponse = await axios.post(
      SONAR_LOGIN_URL,
      {},
      {
        headers: {
          'X-Apig-AppCode': appCode,
        },
      }
    );

    const loginData = loginResponse.data || {};

    if (loginData.status !== 'OK' || !loginData.token) {
      return res.status(502).json({
        status: 'ERROR',
        message: 'Login Sonar gagal.',
        data: loginData,
      });
    }

    const requests = campaigns.map((campaign) =>
      axios.get(SONAR_SUMMARY_URL, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
          'X-Apig-AppCode': appCode,
        },
        params: {
          start_date: startDate,
          end_date: endDate,
          campaign_ids: campaign.id,
        },
      })
        .then((response) => ({
          id: campaign.id,
          name: campaign.name,
          totalPosts: response.data.total_posts || {},
          totalEngagements: response.data.total_engagements || {},
          totalSentiments: response.data.total_sentiments || {},
        }))
        .catch((error) => ({
          id: campaign.id,
          name: campaign.name,
          error: error.response && error.response.data ? error.response.data : (error.message || 'Gagal mengambil data campaign.'),
        }))
    );

    const results = await Promise.all(requests);

    return res.json({
      status: 'OK',
      tokenExpiry: loginData.expires_on,
      campaignSummaries: results.filter((item) => !item.error),
      failedCampaigns: results.filter((item) => item.error),
    });
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Gagal mengambil data Sonar dari server proxy.',
      error: error.response && error.response.data ? error.response.data : (error.message || 'Unknown error'),
    });
  }
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
