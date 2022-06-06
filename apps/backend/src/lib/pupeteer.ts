import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer';
import chromePaths from 'chrome-paths';

export const getBrowserInstance = async (
  size = {
    width: 1920,
    height: 1080,
  }
) => {
  const executablePath = chromePaths.chrome;

  if (!executablePath) {
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      defaultViewport: size,
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: size,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
};
