# The Hambone Slack Bot
Just your friendly neighborhood makerspace bot, under not so heavy development

## Getting started
**YOU WILL NEED AN API KEY**
If you want to test the code at home, feel free to clone or fork. Even deploy in your own slack channel. But please be advised that you will need your own API KEY from Slack [https://api.slack.com/]

### Install Dependencies
Using `pipenv` to track dependinces and virtual enviornment. Run `pipenv install` to automatically install all required packages

## Notes on Where to go from here
__HTTP API__:
+ [Slack HTTP Events](https://api.slack.com/events-api)
+ [Python HTTP Events Module](https://github.com/slackapi/python-slack-events-api)
+ [Ngrok HTTP Tunnel](https://ngrok.com)

__WebSocket/RTM API__:
+ [Slack RTM API Reference](https://api.slack.com/rtm)
+ [Slack RTM Python Reference](https://slack.dev/python-slackclient/real_time_messaging.html)
+ [Python RTM Module](https://github.com/SlackAPI/python-slackclient)

## Hambone Bot API:
AKA what does the bot need to do. What functions should be available externally?

+ Send Alert/Notice
+ Query Internal Data and send response
