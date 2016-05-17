# OpenObjectMarker
An online image dataset sharing and annotating platform.

## Setup

Install node.js and npm:

    # Mac OSX:
    go to https://nodejs.org/en/ and download the .pkg.

    # Ubuntu:
    just install it by apt-get

Clone this repository:

    git clone https://github.com/ikafire/OpenObjectMarker
    cd OpenObjectMarker

Install node package dependency:

    sudo npm install -g # install the cmd tool (e.g., gulp and bower)
    sudo npm install

Install bower components:

    sudo npm install bower -g
    bower install

Build the project:

    sudo npm install gulp -g
    gulp
    
Open a new terminal and start the server:

    cd OpenObjectMarker
    npm start

Open your browser and access http://localhost:3000/
