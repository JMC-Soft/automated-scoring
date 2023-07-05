#!/bin/bash

# Change directory to python
cd python

pip install virtualenv

# Create virtual environment
virtualenv .venv

# Install requirements and run python app in the virtual environment
. .venv/Scripts/activate && pip install -r requirements.txt && python app.py &

# Change directory to web from root directory
cd ../web

# Install requirements
npm install

# Run npm command
npm run dev
