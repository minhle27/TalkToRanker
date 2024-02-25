# TalkToRanker

## Local Use/Development
1. In client, run 'npm install' to install frontend dependencies
2. Set up a separate virtual environment that uses Python version 3.9, using conda(recommended) or virtualenv 
3. Install the dependencies in that environment by running `pip install -r requirements.txt`.
4. For the `nl4dv` model to work, install the following dependencies separately
   (see the `nl4dv`
   [documentation](https://nl4dv.github.io/nl4dv/documentation.html) for more
   details.):
   - `python -m nltk.downloader popular`
   - `python -m spacy download en_core_web_sm`
5. To build the application, in client folder, run 'npm run build' to build bundled version of frontend
   and then navigate back to root dir and run 'flask run' to start the server. The server will serve static build at
   localhost:5000

6. If some problems occur when installing dependencies, make sure the current python version is 3.9.
   You can also try these command to find solutions
   - conda install -c conda-forge package-name==version (install missing dependencies separately)
   - conda list (to list all packages and its version in the current environment)
   - python -m pip install package-name==version

