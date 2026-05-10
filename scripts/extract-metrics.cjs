const fs = require('fs');
const path = require('path');

const REPORT_DIR = path.join(process.cwd(), '.lighthouseci/reports');
const MANIFEST_PATH = path.join(REPORT_DIR, 'manifest.json');

const configName = process.argv[2] || 'Report';

function extractAndSummary() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const runsByUrl = manifest.reduce((acc, run) => {
    if (!acc[run.url]) acc[run.url] = [];
    acc[run.url].push(run);
    return acc;
  }, {});

  let markdown = '| Page | Perf | Acc | B.P | LCP | CLS | TBT |\n';
  markdown += '| :--- | :---: | :---: | :---: | :---: | :---: | :---: |\n';

  for (const [url, runs] of Object.entries(runsByUrl)) {
    const metricsList = runs.map((run) => {
      const reportPath = path.resolve(REPORT_DIR, run.jsonPath);
      if (!fs.existsSync(reportPath)) return null;
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

      return {
        perf: Math.round(report.categories.performance.score * 100),
        acc: Math.round(report.categories.accessibility.score * 100),
        bp: Math.round(report.categories['best-practices'].score * 100),
        lcp: report.audits['largest-contentful-paint']?.numericValue || 0,
        cls: report.audits['cumulative-layout-shift']?.numericValue || 0,
        tbt: report.audits['total-blocking-time']?.numericValue || 0,
      };
    }).filter(Boolean);

    if (metricsList.length === 0) continue;

    const median = (arr) => {
      const sorted = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    };

    const getScoreEmoji = (score) => (score >= 90 ? '🟢' : score >= 50 ? '🟠' : '🔴');

    const perf = median(metricsList.map(m => m.perf));
    const acc = median(metricsList.map(m => m.acc));
    const bp = median(metricsList.map(m => m.bp));
    const lcp = (median(metricsList.map(m => m.lcp)) / 1000).toFixed(2) + 's';
    const cls = median(metricsList.map(m => m.cls)).toFixed(3);
    const tbt = Math.round(median(metricsList.map(m => m.tbt))) + 'ms';
    const pathname = new URL(url).pathname;

    markdown += `| ${pathname} | ${getScoreEmoji(perf)} ${perf} | ${getScoreEmoji(acc)} ${acc} | ${getScoreEmoji(bp)} ${bp} | ${lcp} | ${cls} | ${tbt} |\n`;
  }

  // 제목에 설정 이름(configName) 추가
  const finalMarkdown = `### 🚀 Lighthouse Report [${configName}]\n\n${markdown}`;
  const outputPath = path.join(REPORT_DIR, 'summary.md');
  fs.writeFileSync(outputPath, finalMarkdown);
}

extractAndSummary();
