# Groompbot 2
YouTube-to-Reddit bot for reddit.com/r/gamegrumps

Many details in this code are written specifically for /u/groompbot, and to pull data specifically from the Game Grumps youtube channel. This is uploaded for transparency / education purposes only.

At some point I may clean up this code and make it general so that other people can clone and run it for their own use. Right now, it's "duct tape" code, a temporary solution. If/when Youtube ever fixes their v3 API push notifications, this bot will immediately become obsolete and I'll rewrite it from scratch.

Note that this bot requires a text file in the same directory it runs in called video_history.txt, which is a comma-delimited list populated with at least the last 30 video GUID's posted to the channel it scrapes. Without this file, as soon as the script runs it will instantly submit 30 threads to reddit, which will almost definitely get your account shadow-banned. I could easily fix this but I probably wont since it's temporary anyway.
