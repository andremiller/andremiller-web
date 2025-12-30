AUTHOR = 'Andre Miller'
SITENAME = 'Andre Miller / ZS1XOR'
SITEURL = ""

THEME="themes/andremiller"

PATH = "content"
ARTICLE_PATHS = ["articles"]

ARTICLE_URL = "content/{slug}/"
ARTICLE_SAVE_AS = "content/{slug}/index.html"

USE_FOLDER_AS_CATEGORY = False
DEFAULT_CATEGORY = 'Misc'

TIMEZONE = 'Africa/Johannesburg'

DEFAULT_LANG = 'English'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ("Pelican", "https://getpelican.com/"),
    ("Python.org", "https://www.python.org/"),
    ("Jinja2", "https://palletsprojects.com/p/jinja/"),
    ("You can modify those links in your config file", "#"),
)

# Social widget
SOCIAL = (
    ("GitHub", "https://github.com/andremiller"),
    ("Stack Overflow", "https://stackoverflow.com/users/112517/andre-miller"),
    ("QRZ", "https://www.qrz.com/db/ZS1XOR")
)

DEFAULT_PAGINATION = 10

# Disable author pages
AUTHOR_SAVE_AS = ''
AUTHORS_SAVE_AS = ''

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True
