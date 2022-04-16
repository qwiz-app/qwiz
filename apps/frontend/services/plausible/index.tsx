import { parseData } from 'lib/axios';
import config from 'lib/config';
import http from 'services/http';

interface Visitors {
  results: {
    bounce_rate: {
      value: number;
    };
    pageviews: {
      value: number;
    };
    visit_duration: {
      value: number;
    };
    visitors: {
      value: number;
    };
  };
}

const metrics = 'metrics=visitors,pageviews,bounce_rate,visit_duration';

export const fetchVisitors = async (url: string) => {
  const encodedUrl = encodeURIComponent(url);

  const response = await http.get<Visitors>(
    `${config.plausible.url}/api/v1/stats/aggregate?site_id=${config.plausible.domain}&${metrics}&filters=event:page%3D%3D${encodedUrl}`,
    {
      headers: {
        Authorization: `Bearer ${config.plausible.apiKey}`,
      },
    }
  );
  return parseData(response);
};

interface TopPages {
  results: {
    page: string;
    visitors: number;
    bounce_rate: number;
    pageviews: number;
    visit_duration: number;
  }[];
}

export const fetchTopPages = async () => {
  const response = await http.get<TopPages>(
    `${config.plausible.url}/api/v1/stats/breakdown?site_id=${config.plausible.domain}&${metrics}&property=event:page`,
    {
      headers: {
        Authorization: `Bearer ${config.plausible.apiKey}`,
      },
    }
  );

  return parseData(response);
};
