#!/usr/bin/env python3
"""
Babel setup
"""
from flask_babel import Babel
from flask import Flask, request, render_template


class Config:
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)


@app.route('/')
def get_index() -> str:
    """The home/index page.
    """
    return render_template('2-index.html')


def get_locale() -> str:
    """Get locale from request.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
