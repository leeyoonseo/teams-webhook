const message = {
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
            //    "value": "Safari (Version: 7.0.6)" // Chrome, Opera,.. 삼성브라우저...인앱브라우저 등등은?
            // },
            // {
            //    "name": "OS", // Device? Linux..
            //    "value": "Mac OS X 10.9.5" // Mac, Windows | Mac OS X 10.9.5 (버전도 같이?)
            // },
            // {
            //    "name": "Device", // Desktop?
            //    "value": "PC" // PC | Mobile.... PC냐 Mobile이냐? Window냐 Mac이냐 버전정보도 알수있니?
            // },
            // {
            //    "name": "User IP",
            //    "value": "1.246.86.169" // IP 정보 추출가능?
            // },
            // {
            //    "name": "Date",
            //    "value": "2022.10.06 14:00"
            // },
            // {
            //    "name": "Url",
            //    "value": "http://localhost:3000"
            // },
        ],
      }
  ],
};

module.exports = message;