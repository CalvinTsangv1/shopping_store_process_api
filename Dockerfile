#OS image
FROM ubuntu:20.04
#System setup
RUN apt-get update && apt-get install -y jq sudo curl wget gnupg build-essential git
# Yarn repo
RUN curl fsSL https://dl.yarnpkg.com/debian/pubkey.gpg -k | apt-key add 
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN sudo apt update
#RUN sudo apt -y install yarn 
RUN sudo apt install --no-install-recommends yarn
RUN echo yarn --version
#install nodejs 16.x
RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
#install opencv
RUN sudo apt-get install libopencv-dev python3-opencv -y
RUN sudo apt-get install manpages-dev -y
#setup work directory and copy file
RUN mkdir /code
WORKDIR /code
COPY . /code
RUN yarn install
CMD ["yarn","start"]
