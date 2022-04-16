import { parseData } from 'lib/axios';
import http from 'services/http';

interface Visitors {
  results: {
    visitors: {
      value: number;
    };
  };
}

export const fetchVisitors = async (url: string) => {
  const encodedUrl = encodeURIComponent(url);

  const response = await http.get<Visitors[]>(
    `${process.env.NEXT_PUBLIC_PLAUSIBLE_URL}/api/v1/stats/aggregate?site_id=${process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}&period=6mo&filters=event:page%3D%3D${encodedUrl}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PLAUSIBLE_API_KEY}`,
      },
    }
  );
  return parseData(response);
};

interface TopPages {
  results: {
    page: string;
    visitors: number;
  }[];
}

export const fetchTopPages = async () => {
  const response = await http.get<TopPages>(
    `${process.env.NEXT_PUBLIC_PLAUSIBLE_URL}/api/v1/stats/breakdown?site_id=${process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}&period=6mo&property=event:page`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PLAUSIBLE_API_KEY}`,
      },
    }
  );

  return parseData(response);
};
