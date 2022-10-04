module.exports = {
  "type": "MessageCard",
  "themeColor": "e13f2f",
  "title": "❗️Error: Error",
  "text": "Error Text",
  "sections": [
      {
        "activityTitle": "Information",
        "activitySubtitle": "User-Agent...",
        "markdown": true,
        "facts": [
            {
              "name": "Example",
              "value": "Description...."
            },
            // {
            //    "name": "Browser", // HeadlessChrome...?
            //    // "value": "{ERROR_BROWSER}",
            //    "value": "Safari (Version: 7.0.6)" // Chrome, Opera,.. 삼성브라우저...인앱브라우저 등등은?
            // },
            // // 나누지말고 단순 Headers를 보낼까? (user-agent)
            // // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.78.2 (KHTML, like Gecko) Version/7.0.6 Safari/537.78.2
            // {
            //    "name": "OS", // Device? Linux..
            //    // "value": "{ERROR_OS}",
            //    "value": "Mac OS X 10.9.5" // Mac, Windows | Mac OS X 10.9.5 (버전도 같이?)
            // },
            // {
            //    "name": "Device", // Desktop?
            //    // "value": "{ERROR_ENVIRONMENT}",
            //    "value": "PC" // PC | Mobile.... PC냐 Mobile이냐? Window냐 Mac이냐 버전정보도 알수있니?
            // },
            // {
            //    "name": "User IP",
            //    // "value": "{ERROR_IP}",
            //    "value": "1.246.86.169" // IP 정보 추출가능?
            // },
            // {
            //    "name": "Date",
            //    // "value": "{ERROR_IP}",
            //    "value": "1.246.86.169" // IP 정보 추출가능?
            // },
            // {
            //    "name": "Url",
            //    // "value": "{ERROR_URL}",
            //    "value": "https://search.tmon.co.kr/search"
            // },
        ],
      }
  ],
};