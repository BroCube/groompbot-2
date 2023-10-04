# yt-to-reddit bot

This code was originally inspired by /u/groompbot and the work to improve the code done by https://github.com/BroCube/groompbot-2

But I've massively rewritten it, it probably little resembles what came before, so while it's a fork, it's basically very different.

You'll need to know how to get access to the Reddit API and with the recent changes I don't know how well this is going to continue to work. But for the purposes I am using it, it's working. I created an entirely different user to run the bot rather than attaching the script to my personal reddit account. And you'll need to put the API key stuff into the code to make that work.

To configure it beyond just the API, you'll need the bot to be a member of the reddit itself. Then change the names of the reddit page and youtube channel in the code to reflect what you need. I was lazy to add top variables, so just look for "DextersTechLab" in the code and change that, there are three references to it.

Warning, I am not a day-to-day coder, no warranty is implied or given. Use at your own risk.

I am running this using a service and then it has its own node cron which keeps it running in the background, periodically checking the YT page for new videos to post.

If videos are too old it probably won't add them to avoid spamming the channel, but watch out when you first run it. It uses YT search to find the content and vaguely keep it in order, but no order is assured because... Google and "The Algorithm".

Note that this bot requires a text file in the same directory it runs in called video_history.txt, which is a comma-delimited list populated with at least the last 30 video GUID's posted to the channel it scrapes. Without this file, as soon as the script runs it will instantly submit 30 threads to reddit, which will almost definitely get your account shadow-banned. I could easily fix this but I probably wont since it's temporary anyway.
